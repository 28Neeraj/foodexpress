import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ImageWithFallback from "./ImageWithFallback";

function CartPreviewBar() {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const latestItem = cart[cart.length - 1];

  if (!itemCount || ["/cart", "/checkout"].includes(location.pathname)) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5">
      <div className="mx-auto max-w-3xl rounded-2xl border border-orange-300 bg-white p-2 shadow-[0_-8px_35px_rgba(15,23,42,0.18)]">
        <button onClick={() => navigate("/cart")} className="flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-3 py-3 text-left text-white transition hover:from-orange-600 hover:to-red-600 sm:px-4">
          <div className="relative shrink-0">
            <ImageWithFallback src={latestItem?.image} alt="Cart item" className="h-11 w-11 rounded-lg object-cover ring-2 ring-white/70" />
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-slate-900 px-1 text-[10px] font-black">{itemCount}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-extrabold">{itemCount} {itemCount === 1 ? "item" : "items"} added</p>
            <p className="text-sm text-orange-100">Cart total ₹{total.toFixed(0)}</p>
          </div>
          <span className="inline-flex items-center gap-2 font-extrabold">View cart <FaArrowRight /></span>
        </button>
      </div>
    </div>
  );
}

export default CartPreviewBar;
