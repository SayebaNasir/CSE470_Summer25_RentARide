import express from "express";
import { protect } from "../middleware/auth.js";
import { addCarReview, getCarReviews } from '../controllers/carController.js';

const router = express.Router();

// Add a review for a car
router.post("/review", protect, addCarReview);

// Get all reviews for a car
router.get("/reviews/:carId", getCarReviews);

export default router;
