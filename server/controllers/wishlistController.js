
import User from "../models/User.js";
import Car from "../models/Car.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    const user = await User.findById(userId);

    if (user.wishlist.includes(carId)) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push(carId);
    await user.save();

    res.json({ message: "Car added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carId } = req.body;

    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== carId.toString()
    );
    await user.save();

    res.json({ message: "Car removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
