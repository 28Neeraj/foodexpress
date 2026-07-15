const Wishlist = require("../models/Wishlist");

// GET WISHLIST
const getWishlist = async (req, res) => {

  try {

    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {

      wishlist = await Wishlist.create({
        user: req.user._id,
        items: [],
      });

    }

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// TOGGLE WISHLIST
const toggleWishlist = async (req, res) => {

  try {

    const {
      foodId,
      foodName,
      image,
      price,
    } = req.body;

    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {

      wishlist = await Wishlist.create({
        user: req.user._id,
        items: [],
      });

    }

    const exist = wishlist.items.find(
      (item) =>
        item.foodId.toString() === foodId
    );

    if (exist) {

      wishlist.items = wishlist.items.filter(
        (item) =>
          item.foodId.toString() !== foodId
      );

    } else {

      wishlist.items.push({
        foodId,
        foodName,
        image,
        price,
      });

    }

    await wishlist.save();

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getWishlist,
  toggleWishlist,
};