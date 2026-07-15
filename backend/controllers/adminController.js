const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");

const getAllFoods = async (req, res) => {

  try {

    const restaurants = await Restaurant.find();

    let foods = [];

    restaurants.forEach((restaurant) => {

      restaurant.menu.forEach((food) => {

        foods.push({

          ...food.toObject(),

          restaurantId: restaurant._id,

          restaurantName: restaurant.name,

        });

      });

    });

    res.json(foods);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET ALL USERS

const getAllUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const addFood = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(
      req.params.restaurantId
    );

    if (!restaurant) {

      return res.status(404).json({
        message: "Restaurant Not Found",
      });

    }

    restaurant.menu.push(req.body);

    await restaurant.save();

    res.json({
      message: "Food Added Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getAnalytics = async (req, res) => {

  try {

    const orders = await Order.find();
    const restaurants = await Restaurant.find();

    const monthlyRevenue = new Array(12).fill(0);
    const monthlyOrders = new Array(12).fill(0);

    orders.forEach(order => {

      const month = new Date(order.createdAt).getMonth();

      monthlyRevenue[month] += order.totalAmount;
      monthlyOrders[month]++;

    });

    const topRestaurants = await Restaurant.find()
      .sort({ rating: -1 })
      .limit(5)
      .select("name rating");

    const topCustomers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email");

    let foods = [];

    restaurants.forEach((restaurant) => {

      restaurant.menu.forEach((food) => {

        foods.push({
          name: food.name,
          price: food.price,
          restaurant: restaurant.name,
        });

      });

    });

    foods.sort((a, b) => b.price - a.price);

    const topFoods = foods.slice(0, 5);

    res.json({

      monthlyRevenue,
      monthlyOrders,
      totalRevenue: monthlyRevenue.reduce((a, b) => a + b, 0),
      totalOrders: orders.length,
      topFoods,
      topRestaurants,
      topCustomers,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {

      return res.status(404).json({
        message: "Order Not Found",
      });

    }

    order.status = req.body.status;

    await order.save();

    res.json({
      message: "Order Status Updated",
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


const deleteFood = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(
      req.params.restaurantId
    );

    restaurant.menu = restaurant.menu.filter(

      (food) =>
        food._id.toString() !== req.params.foodId

    );

    await restaurant.save();

    res.json({
      message: "Food Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// GET ALL RESTAURANTS

const getAllRestaurants = async (req, res) => {

  try {

    const restaurants = await Restaurant.find();

    res.json(restaurants);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// UPDATE FOOD

const updateFood = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(
      req.params.restaurantId
    );

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

    food.name = req.body.name;
    food.category = req.body.category;
    food.price = req.body.price;
    food.image = req.body.image;
    food.isAvailable = req.body.isAvailable;

    await restaurant.save();

    res.json({
      message: "Food Updated Successfully",
      food,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// TOGGLE FOOD AVAILABILITY

const toggleFoodAvailability = async (req, res) => {

  try {

    const restaurant = await Restaurant.findById(
      req.params.restaurantId
    );

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

    food.isAvailable = !food.isAvailable;

    await restaurant.save();

    res.json({
      message: "Availability Updated",
      food,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


const getDashboardStats = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    const totalRestaurants = await Restaurant.countDocuments();

    const totalOrders = await Order.countDocuments();

    const restaurants = await Restaurant.find();

    const totalFoods = restaurants.reduce(

      (sum, restaurant) =>

        sum + restaurant.menu.length,

      0

    );

    const orders = await Order.find();

    const totalRevenue = orders.reduce(

      (sum, order) =>

        sum + order.totalAmount,

      0

    );

    const recentOrders = await Order.find()

      .sort({ createdAt: -1 })

      .limit(5)

      .populate("user", "name email");


    res.json({

  totalUsers,

  totalRestaurants,

  totalFoods,

  totalOrders,

  totalRevenue,

  recentOrders,

});

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllRestaurants,
  getAllFoods,
  addFood,
  deleteFood,
  updateFood,
  toggleFoodAvailability,
  getAnalytics,
  getAllOrders,
  updateOrderStatus,
};