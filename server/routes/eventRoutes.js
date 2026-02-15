import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  getCategories,
  getLocations,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/meta/categories', getCategories);
router.get('/meta/locations', getLocations);
router.get('/:id', getEventById);
router.post('/', protect, createEvent); // Optional - for admin

export default router;
