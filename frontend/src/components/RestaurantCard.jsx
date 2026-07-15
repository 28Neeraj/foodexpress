import { FaArrowRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  return <article onClick={() => navigate(`/restaurant/${restaurant._id}`)} className="group cursor-pointer overflow-hidden rounded-3xl border border-orange-100 bg-white p-2 shadow-[0_10px_30px_-18px_rgba(30,41,59,.35)] transition duration-300 hover:-translate-y-2 hover:shadow-xl">
    <div className="relative overflow-hidden rounded-2xl"><ImageWithFallback src={restaurant.image} alt={restaurant.name} type="restaurant" className="h-48 w-full object-cover transition duration-500 group-hover:scale-110" /><span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-black text-green-700 shadow">{restaurant.offer || "20% OFF"}</span></div>
    <div className="px-3 pb-3 pt-4"><div className="flex items-start justify-between gap-3"><div><h2 className="line-clamp-1 text-lg font-extrabold text-slate-900">{restaurant.name}</h2><p className="mt-1 line-clamp-1 text-sm text-slate-500">{restaurant.address || "Delicious food near you"}</p></div><span className="flex shrink-0 items-center gap-1 rounded-md bg-green-700 px-2 py-1 text-xs font-bold text-white"><FaStar className="text-[10px]" /> {restaurant.rating || "4.2"}</span></div><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm font-semibold text-slate-500"><span>{restaurant.delivery || "Fast delivery"}</span><span className="flex items-center gap-1 text-orange-600">View menu <FaArrowRight className="text-xs" /></span></div></div>
  </article>;
}
export default RestaurantCard;
