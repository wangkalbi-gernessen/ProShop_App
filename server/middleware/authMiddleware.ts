import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import asyncHandler from "express-async-handler";

declare global {
  namespace Express {
      interface Request {
          // user? : Record<string,any>
          user? : String
      }
  }
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded: any = jwt.verify(token, (process.env.JWT_SECRET as any));

      (req.user as any) = await UserModel.findById(decoded.id).select('-password');
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');    
    }
  }
  if(!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
  next();
});

export { protect }
