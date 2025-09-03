import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

// Review schema
const reviewSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" }, // made optional for now
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Car schema
const carSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" }, // removed required
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    reviews: [reviewSchema], // reviews embedded
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
