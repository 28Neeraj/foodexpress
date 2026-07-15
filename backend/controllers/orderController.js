const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { calculateCouponDiscount } = require("../constants/coupons");

// PLACE ORDER

const placeOrder = async (req, res) => {

  try {

    const {
      deliveryAddress,
      paymentMethod,
    } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart || cart.items.length === 0) {

      return res.status(400).json({
        message: "Cart is Empty",
      });

    }

    const total = cart.items.reduce(

      (sum, item) =>

        sum + item.price * item.quantity,

      0

    );

    const coupon = calculateCouponDiscount(req.body.couponCode, total);

    const order = await Order.create({

      user: req.user._id,

      items: cart.items,

      totalAmount: total - coupon.discount,

      deliveryAddress,

      paymentMethod,

      couponCode: coupon.code,
      discountAmount: coupon.discount,
      estimatedDeliveryAt: new Date(Date.now() + 35 * 60 * 1000),
      statusTimeline: [{ status: "Placed", note: "Order received" }],

    });
    // Kept for historical reference; email is dispatched after the response below.
    if (false) try {

  const user = await User.findById(req.user._id);

  await sendEmail(
  user.email,
  "Order Placed Successfully",
  `
    <h1>FoodExpress</h1>
    <p>Your order has been placed successfully.</p>
    <p>Order ID: ${order._id}</p>
  `
);

  console.log("✅ Email Sent");

} catch (err) {

  console.log("❌ EMAIL ERROR:", err);

}
    
    // Clear Cart After Successful Order

cart.items = [];

await cart.save();

    res.status(201).json({

      message: "Order Placed Successfully",

      order,

    });

    void (async () => {
      try {
        const user = await User.findById(req.user._id);
        if (user?.email) await sendEmail(user.email, "Order Placed Successfully", `<h1>FoodExpress</h1><p>Your order has been placed successfully.</p><p>Order ID: ${order._id}</p>`);
      } catch (mailError) {
        console.error("Order confirmation email failed:", mailError.message);
      }
    })();

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};
// GET MY ORDERS

const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET SINGLE ORDER

const getOrderById = async (req, res) => {

  try {

    const order = await Order.findOne({

      _id: req.params.id,

      user: req.user._id,

    });

    if (!order) {

      return res.status(404).json({

        message: "Order Not Found",

      });

    }

    res.json(order);

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

const sendEmail = require("../utils/sendEmail");

const {
  orderPlacedTemplate,
} = require("../utils/emailTemplates");

const User = require("../models/User");

// UPDATE ORDER STATUS

const updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {

      return res.status(404).json({

        message: "Order Not Found",

      });

    }

    order.orderStatus = status;
    order.statusTimeline.push({ status, note: req.body.note || "Status updated" });

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

module.exports = {

  placeOrder,

  getMyOrders,

  getOrderById,

  updateOrderStatus,

};
