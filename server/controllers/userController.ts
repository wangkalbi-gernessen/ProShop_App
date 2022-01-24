import { Request, Response } from "express";
import UserModel from "../models/userModel";
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';

declare global {
  namespace Express {
    export interface Request {
        user: Record<string, any>
        // user: any 
    }
  }
}

// @desc Auth user & get token
// @route Post /api/users/login
// @access Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: any  = await UserModel.findOne({ email });

  if(user && (await user.matchPassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password'); 
  }
});

// @desc Register a new user
// @route GET /api/users/login
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  const userExists: any  = await UserModel.findOne({ email });

  if(userExists) {
    res.status(400);
    throw new Error('User already exists');
  }  

  const user = await UserModel.create({
    name,
    email,
    password
  });

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user: any = await UserModel.findById((req.user as any)._id);

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update user profile
// @route Put /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user: any = await UserModel.findById((req.user as any)._id);

  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser: any = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users: any = await UserModel.find({ });
  res.json(users);
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user: any = await UserModel.findById(req.params.id);
  
  if(user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);

  }
  
});

export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser }