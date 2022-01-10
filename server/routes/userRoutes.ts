import express from "express";
// import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController';
import { authUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authUser);
// router.route('/').post(registerUser);
// router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;