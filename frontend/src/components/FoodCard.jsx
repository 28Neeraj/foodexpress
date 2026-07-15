import { FaPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import ImageWithFallback from "./ImageWithFallback";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  return <div className="group overflow-hidden rounded-3xl border border-orange-100 bg-white p-2 shadow-[0_10px_30px_-18px_rgba(30,41,59,.35)]">
    <div className="relative overflow-hidden rounded-2xl">
      <ImageWithFallback src={food.image} alt={food.name} className="h-52 w-full object-cover transition duration-500 group-hover:scale-110" />
      <span className={`absolute left-3 top-3 h-3 w-3 rounded-sm border-2 border-white ${food.isVeg ? "bg-green-500" : "bg-red-500"}`} />
    </div>
    <div className="p-3">
      <h2 className="line-clamp-1 text-lg font-extrabold">{food.name}</h2>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-base font-black text-slate-900">₹{food.price}</span>
        <button disabled={!food.isAvailable} onClick={() => addToCart(food)} className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"><FaPlus className="text-xs" /> {food.isAvailable ? "Add" : "Sold out"}</button>
      </div>
    </div>
  </div>;
}

export default FoodCard;
