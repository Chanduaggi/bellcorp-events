import express from 'express';
import {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  checkRegistration,
} from '../controllers/registrationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.post('/:eventId', protect, registerForEvent);
router.delete('/:eventId', protect, cancelRegistration);
router.get('/my-events', protect, getMyRegistrations);
router.get('/check/:eventId', protect, checkRegistration);

export default router;
