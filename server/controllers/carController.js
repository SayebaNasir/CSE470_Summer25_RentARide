import Car from "../models/Car.js";

// Add a review for a car
export const addCarReview = async (req, res) => {
  try {
    const { carId, rating, comment } = req.body;
    const user = req.user;

    if (!carId || !rating || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be a number between 1 and 5" });
    }

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    // Optional: prevent same user from reviewing multiple times
    const existingReview = car.reviews.find(r => r.user.toString() === user._id.toString());
    if (existingReview) {
      return res.status(400).json({ success: false, message: "You have already reviewed this car" });
    }

    const review = {
      user: user._id,
      name: user.name || user.email, // fallback in case name is missing
      rating: numericRating,
      comment: comment.trim(),
    };

    car.reviews.push(review);
    await car.save();

    res.json({ success: true, message: "Review added successfully", review });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews for a car
export const getCarReviews = async (req, res) => {
  try {
    const { carId } = req.params;

    if (!carId) {
      return res.status(400).json({ success: false, message: "Car ID is required" });
    }

    const car = await Car.findById(carId).populate("reviews.user", "name email");
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });

    res.json({ success: true, reviews: car.reviews });
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
