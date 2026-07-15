import { createContext, useContext, useEffect, useState } from "react";

import {
  getWishlist,
  toggleWishlist as toggleWishlistAPI,
} from "../services/wishlistService";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    loadWishlist();

  }, []);

  async function loadWishlist() {

    try {

      const data = await getWishlist();

      setWishlist(data.items);

    } catch (error) {

      console.log(error);

    }

  }

  async function toggleWishlist(food) {

    try {

      const data = await toggleWishlistAPI(food);

      setWishlist(data.items);

    } catch (error) {

      console.log(error);

    }

  }

  function isWishlisted(foodId) {

    return wishlist.some(
      (item) => item.foodId.toString() === foodId.toString()
    );

  }

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}

export function useWishlist() {

  return useContext(WishlistContext);

}