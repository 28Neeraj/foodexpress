import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WishlistProvider } from "./context/WishlistContext";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

<NotificationProvider>

<WishlistProvider>

<CartProvider>

<App/>

</CartProvider>

</WishlistProvider>

</NotificationProvider>

</AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
