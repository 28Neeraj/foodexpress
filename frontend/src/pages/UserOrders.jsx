import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyOrders } from "../services/orderService";
import LiveOrderMap from "../components/LiveOrderMap";

const statusSteps = [
  "Placed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

function getStatusColor(status) {
  switch (status) {
    case "Placed":
      return "bg-yellow-100 text-yellow-700";
    case "Preparing":
      return "bg-orange-100 text-orange-700";
    case "Out for Delivery":
      return "bg-blue-100 text-blue-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  async function loadOrders() {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-3xl font-bold">Loading Orders...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="page-shell max-w-6xl py-10">
        <p className="section-kicker">Live order updates</p><h1 className="section-title">My Orders</h1>
        <p className="text-gray-500 mt-2 mb-10">
          Orders refresh automatically every 15 seconds.
        </p>

        {orders.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold">No Orders Yet 🍔</h2>
            <p className="text-gray-500 mt-4">Place your first order.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => {
              const current = statusSteps.indexOf(order.orderStatus);

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-[2rem] border border-orange-100 shadow-xl shadow-orange-100/30 p-6 sm:p-8"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Order #{order._id.slice(-6)}
                      </h2>
                      <p className="text-gray-500 mt-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`${getStatusColor(
                        order.orderStatus
                      )} px-5 py-2 rounded-full font-bold`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Status Steps Tracker */}
                  <div className="mt-10">
                    <div className="flex justify-between">
                      {statusSteps.map((step, index) => (
                        <div
                          key={step}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                              index <= current ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            {index <= current ? "✓" : index + 1}
                          </div>
                          <p
                            className={`mt-3 text-sm font-semibold text-center ${
                              index <= current
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-8">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${
                          order.orderStatus === "Delivered"
                            ? "w-full bg-green-500"
                            : order.orderStatus === "Out for Delivery"
                            ? "w-3/4 bg-blue-500"
                            : order.orderStatus === "Preparing"
                            ? "w-1/2 bg-orange-500"
                            : "w-1/4 bg-yellow-500"
                        }`}
                      />
                    </div>

                    {/* Status Alert Box */}
                    <div className="bg-gray-50 rounded-xl p-6 mt-8">
                      {/* FIXED: Elements are now properly nested inside this flex container */}
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">
                          {order.orderStatus === "Delivered"
                            ? "🎉"
                            : order.orderStatus === "Out for Delivery"
                            ? "🛵"
                            : order.orderStatus === "Preparing"
                            ? "👨‍🍳"
                            : "📦"}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold">
                            {order.orderStatus === "Delivered"
                              ? "Order Delivered"
                              : order.orderStatus}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {order.orderStatus === "Delivered"
                              ? "🎉 Thank you for ordering with FoodExpress."
                              : order.orderStatus === "Out for Delivery"
                              ? "🛵 Rider is on the way."
                              : order.orderStatus === "Preparing"
                              ? "👨‍🍳 Restaurant is preparing your food."
                              : "📦 Your order has been placed successfully."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {order.orderStatus !== "Delivered" && <LiveOrderMap orderId={order._id} />}

                  {/* Ordered Items */}
                  <div className="mt-10">
                    <h3 className="text-xl font-bold mb-5">
                      🍔 Ordered Items
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border rounded-xl p-4"
                        >
                          <div className="flex items-center gap-4">
                            {item.image && <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />}
                            <div>
                            <h4 className="font-bold text-lg">{item.name}</h4>
                            <p className="text-gray-500">
                              Quantity : {item.quantity}
                            </p>
                            </div>
                          </div>
                          <div className="text-xl font-bold text-red-500">
                            ₹{item.price * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="my-8" />

                  {/* Payment & Address */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-lg mb-3">
                        💳 Payment Method
                      </h3>
                      <p>{order.paymentMethod}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3">
                        📍 Delivery Address
                      </h3>
                      <p>{order.deliveryAddress}</p>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="flex justify-between items-center mt-10">
                    <h2 className="text-3xl font-bold">Total</h2>
                    <h2 className="text-3xl font-bold text-red-500">
                      ₹{order.totalAmount}
                    </h2>
                  </div>

                  {/* Footer Timestamp */}
                  <div className="mt-6 text-gray-500">
                    Last Updated :{" "}
                    {new Date(order.updatedAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default Orders;
