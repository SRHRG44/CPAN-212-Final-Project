import express from 'express';
import profileController from '../controllers/profile_controller.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/profile', auth.verifyToken, profileController.getProfile);
router.put('/profile', auth.verifyToken, profileController.updateProfile);

export default router;