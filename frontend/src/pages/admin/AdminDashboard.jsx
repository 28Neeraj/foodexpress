import { useEffect, useState } from "react";
// ../../../ se components access karenge kyunki ab hum 3 level deep hain: pages/admin/AdminDashboard
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import RevenueChart from "../../components/RevenueChart";
import OrdersChart from "../../components/OrdersChart";

import { getDashboardStats, getAnalytics } from "../../services/adminService";

import { saveAs } from "file-saver";
import jsPDF from "jspdf";

function AdminDashboard() {
  const [filter, setFilter] = useState("30");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalFoods: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [analytics, setAnalytics] = useState({
    monthlyRevenue: [],
    monthlyOrders: [],
    topFoods: [],
    topRestaurants: [],
    topCustomers: [],
  });

  const [loading, setLoading] = useState(true);

  // Load Initial Dashboard Stats
  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  // Reload Analytics whenever the filter changes
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await getAnalytics(filter);
        setAnalytics(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadAnalytics();
  }, [filter]);

  // CSV Export Function
  function exportCSV() {
    let csv = "Month,Revenue,Orders\n";
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    months.forEach((month, index) => {
      const revenue = analytics.monthlyRevenue?.[index] || 0;
      const orders = analytics.monthlyOrders?.[index] || 0;
      csv += `${month},${revenue},${orders}\n`;
    });

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "analytics.csv");
  }

  // PDF Export Function
  function exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("FoodExpress Analytics", 20, 20);
    doc.text(`Revenue : ₹${stats.totalRevenue}`, 20, 40);
    doc.text(`Orders : ${stats.totalOrders}`, 20, 50);
    doc.save("analytics.pdf");
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-4xl font-bold">
          Loading Dashboard...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-5xl font-bold mb-10">
            Admin Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg">
              <h2>Total Users</h2>
              <p className="text-4xl font-bold mt-4">
                {stats.totalUsers}
              </p>
            </div>
            <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg">
              <h2>Restaurants</h2>
              <p className="text-4xl font-bold mt-4">
                {stats.totalRestaurants}
              </p>
            </div>
            <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">
              <h2>Foods</h2>
              <p className="text-4xl font-bold mt-4">
                {stats.totalFoods}
              </p>
            </div>
            <div className="bg-purple-500 text-white rounded-xl p-6 shadow-lg">
              <h2>Orders</h2>
              <p className="text-4xl font-bold mt-4">
                {stats.totalOrders}
              </p>
            </div>
            <div className="bg-red-500 text-white rounded-xl p-6 shadow-lg">
              <h2>Revenue</h2>
              <p className="text-4xl font-bold mt-4">
                ₹{stats.totalRevenue}
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex justify-between items-center mb-6 mt-10">
            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={exportCSV}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-medium transition-colors"
              >
                Export CSV
              </button>
              <button
                onClick={exportPDF}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-medium transition-colors"
              >
                Export PDF
              </button>
            </div>

            {/* Filter Dropdown */}
            <select
              className="border p-3 rounded-lg bg-white shadow-sm cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="365">Last 1 Year</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            <RevenueChart revenue={analytics.monthlyRevenue} />
            <OrdersChart orders={analytics.monthlyOrders} />
          </div>

          {/* Top Analytics Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Top Foods */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">🔥 Top Foods</h2>
              {analytics.topFoods?.map((food, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b py-2"
                >
                  <span>{food.name}</span>
                  <span>₹{food.price}</span>
                </div>
              ))}
            </div>

            {/* Top Restaurants */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">🏪 Top Restaurants</h2>
              {analytics.topRestaurants?.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="flex justify-between border-b py-2"
                >
                  <span>{restaurant.name}</span>
                  <span>⭐ {restaurant.rating}</span>
                </div>
              ))}
            </div>

            {/* Top Customers */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">👑 Customers</h2>
              {analytics.topCustomers?.map((customer) => (
                <div key={customer._id} className="border-b py-2">
                  <h3>{customer.name}</h3>
                  <p className="text-gray-500">{customer.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;