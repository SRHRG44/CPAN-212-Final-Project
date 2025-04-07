import express from 'express';
import profileController from '../controllers/profile_controller.js';
const router = express.Router();

router.get('/profile', profileController.getProfile);
router.put('/profile', profileController.updateProfile);

export default router;