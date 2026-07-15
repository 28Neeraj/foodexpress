import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ImageWithFallback from "./ImageWithFallback";

function MenuCard({ food }) {

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  return (

    <div className="group overflow-hidden rounded-3xl border border-orange-100 bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <ImageWithFallback
        src={food.image}
        alt={food.name}
        className="h-52 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="p-4">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            {food.name}
          </h2>

          <FaHeart
            size={22}
            onClick={() => toggleWishlist(food)}
            className={`cursor-pointer ${
              isWishlisted(food._id.toString())
                ? "text-red-500"
                : "text-gray-400"
            }`}
          />

        </div>

        <p className="text-gray-500 mt-2">
          {food.category}
        </p>

        <p className="text-red-500 text-xl font-bold mt-3">
          ₹{food.price}
        </p>

        <button
          onClick={() => addToCart(food)}
          className="mt-5 w-full rounded-xl bg-orange-500 p-3 font-bold text-white transition hover:bg-orange-600 active:scale-95"
        >
          Add To Cart
        </button>

      </div>

    </div>

  );

}

export default MenuCard;
