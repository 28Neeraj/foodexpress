import { createContext, useContext, useEffect, useState } from "react";

import {
  getCart,
  addToCart as addCartAPI,
  updateQuantity,
  removeItem,
} from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

useEffect(() => {

  loadCart();

}, []);

async function loadCart() {

  try {

    const data = await getCart();

    setCart(data.items);

  } catch (error) {

    console.log(error);

  }

}

  async function addToCart(food) {

  try {

    const data = await addCartAPI(food);

    setCart(data.items);

  } catch (error) {

    console.log(error);

  }

}

  async function increase(foodId) {

  try {

    const data = await updateQuantity(
      foodId,
      "increase"
    );

    setCart(data.items);

  } catch (error) {

    console.log(error);

  }

}

  async function decrease(foodId) {

  try {

    const data = await updateQuantity(
      foodId,
      "decrease"
    );

    setCart(data.items);

  } catch (error) {

    console.log(error);

  }

}

  async function removeFromCart(foodId) {

  try {

    const data = await removeItem(foodId);

    setCart(data.items);

  } catch (error) {

    console.log(error);

  }

}

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        removeFromCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {
  return useContext(CartContext);
}