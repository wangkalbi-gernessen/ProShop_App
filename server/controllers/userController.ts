import { Request, Response } from "express";
import UserModel from "../models/userModel";
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';

// @desc Auth user & get token
// @route Post /api/users/login
// @access Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const user  = await UserModel.findOne({ email });

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password'); 
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user: any = await UserModel.findById(req.user._id);

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

export { authUser, getUserProfile }