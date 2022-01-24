import express from "express";
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser } from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;