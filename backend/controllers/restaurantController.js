const Restaurant = require("../models/Restaurant");

// GET ALL RESTAURANTS
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET SINGLE RESTAURANT
const getRestaurantById = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {

      return res.status(404).json({
        message: "Restaurant Not Found",
      });

    }

    res.status(200).json(restaurant);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// ADMIN - ADD RESTAURANT

const addRestaurant = async (req, res) => {

  try {

    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({

      message: "Restaurant Added Successfully",

      restaurant,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// ADMIN - UPDATE RESTAURANT

const updateRestaurant = async (req, res) => {

  try {

    const restaurant = await Restaurant.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    if (!restaurant) {

      return res.status(404).json({

        message: "Restaurant Not Found",

      });

    }

    res.json({

      message: "Restaurant Updated",

      restaurant,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// ADMIN - DELETE RESTAURANT

const deleteRestaurant = async (req, res) => {

  try {

    const restaurant = await Restaurant.findByIdAndDelete(

      req.params.id

    );

    if (!restaurant) {

      return res.status(404).json({

        message: "Restaurant Not Found",

      });

    }

    res.json({

      message: "Restaurant Deleted Successfully",

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};
// ADMIN - ADD FOOD

const addFood = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {

      return res.status(404).json({
        message: "Restaurant Not Found",
      });

    }

    restaurant.menu.push(req.body);

    await restaurant.save();

    res.status(201).json({

      message: "Food Added Successfully",

      menu: restaurant.menu,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// ADMIN - UPDATE FOOD

const updateFood = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {

      return res.status(404).json({

        message: "Restaurant Not Found",

      });

    }

    const food = restaurant.menu.id(req.params.foodId);

    if (!food) {

      return res.status(404).json({

        message: "Food Not Found",

      });

    }

    Object.assign(food, req.body);

    await restaurant.save();

    res.json({

      message: "Food Updated",

      menu: restaurant.menu,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};


// ADMIN - DELETE FOOD

const deleteFood = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {

      return res.status(404).json({

        message: "Restaurant Not Found",

      });

    }

    restaurant.menu = restaurant.menu.filter(

      (food) =>
        food._id.toString() !== req.params.foodId

    );

    await restaurant.save();

    res.json({

      message: "Food Deleted",

      menu: restaurant.menu,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// GET MENU
const getRestaurantMenu = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {

      return res.status(404).json({
        message: "Restaurant Not Found",
      });

    }

    res.status(200).json(restaurant.menu);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  getRestaurants,

  getRestaurantById,

  getRestaurantMenu,

  addRestaurant,

  updateRestaurant,

  deleteRestaurant,

  addFood,

  updateFood,

  deleteFood,

};