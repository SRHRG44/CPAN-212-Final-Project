import express from 'express';
import userController from '../controllers/user_controller.js';
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

export default router;