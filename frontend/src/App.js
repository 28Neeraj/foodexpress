import { Routes, Route } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import RestaurantDetails from "./pages/RestaurantDetails";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import RestaurantsAdmin from "./pages/admin/Restaurants";
import Orders from "./pages/admin/Orders";
import Foods from "./pages/admin/Foods";
import Approvals from "./pages/admin/Approvals";
import Checkout from "./pages/Checkout";
import UserOrders from "./pages/UserOrders";
import Profile from "./pages/Profile";
import Addresses from "./pages/Addresses";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import DeliveryPartner from "./pages/DeliveryPartner";
import OrderSuccess from "./pages/OrderSuccess";
import Welcome from "./pages/Welcome";
import FooterInfoPage from "./pages/FooterInfoPage";
import CartPreviewBar from "./components/CartPreviewBar";
import PartnerPortal from "./pages/onboarding/PartnerPortal";
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";

function App() {
  return (
    
    <>
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/:page" element={<FooterInfoPage />} />
      <Route
        path="/restaurants"
        element={<Restaurants />}
      />
     <Route
  path="/wishlist"
  element={<Wishlist />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

<Route
  path="/verify-otp"
  element={<VerifyOtp />}
/>

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/addresses"
  element={<Addresses />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/admin"
  element={<AdminDashboard />}
/>
<Route path="/admin/approvals" element={<Approvals />} />
<Route path="/delivery" element={<DeliveryPartner />} />
<Route path="/delivery-partner" element={<PartnerPortal type="delivery" />} />
<Route path="/restaurant-partner" element={<PartnerPortal type="restaurant" />} />
<Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
<Route path="/order/:id" element={<OrderSuccess />} />
      <Route
        path="/restaurant/:id"
        element={<RestaurantDetails/>}
      />
<Route
  path="/orders"
  element={<UserOrders />}
/>

<Route
  path="/admin/users"
  element={<Users />}
/>

<Route
  path="/checkout"
  element={<Checkout />}
/>

<Route
  path="/admin/restaurants"
  element={<RestaurantsAdmin />}
/>

<Route
  path="/admin/orders"
  element={<Orders />}
/>
<Route
  path="/admin/foods"
  element={<Foods />}
/>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

    </Routes>
    <CartPreviewBar />
    </>
    
  );
}

export default App;
