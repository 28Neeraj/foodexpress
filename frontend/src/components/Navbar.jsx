import { Link } from "react-router-dom";
import { FaHeart, FaShoppingBag, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

function Badge({ children }) { return <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-black text-white">{children}</span>; }

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-xl">
      <div className="page-shell flex h-[74px] items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-red-500 text-lg shadow-lg shadow-orange-200">🍴</span><span className="text-xl font-black tracking-tight text-slate-900">food<span className="text-orange-500">express</span></span></Link>
        <div className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex"><Link className="transition hover:text-orange-500" to="/">Home</Link><Link className="transition hover:text-orange-500" to="/restaurants">Restaurants</Link><Link className="transition hover:text-orange-500" to="/orders">My orders</Link></div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="grid h-10 w-10 place-items-center rounded-xl border border-orange-100 text-slate-700 hover:bg-orange-50">{theme === "dark" ? <FaSun /> : <FaMoon />}</button>
          {user ? <>
            <Link aria-label="Wishlist" to="/wishlist" className="relative hidden rounded-xl p-2 text-slate-700 hover:bg-orange-50 sm:block"><FaHeart />{wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}</Link>
            <Link aria-label="Cart" to="/cart" className="relative rounded-xl bg-orange-50 p-2.5 text-orange-600 hover:bg-orange-100"><FaShoppingBag />{totalItems > 0 && <Badge>{totalItems}</Badge>}</Link>
            <Link to="/profile" className="hidden items-center gap-2 text-sm font-bold sm:flex"><FaUserCircle className="text-xl text-slate-500" />{user.name?.split(" ")[0]}</Link>
            {user.role === "admin" && <Link to="/admin/approvals" className="hidden rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white lg:block">Admin</Link>}
            {user.role === "restaurant_owner" && <Link to="/restaurant/dashboard" className="hidden rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white lg:block">Restaurant</Link>}
            {user.role === "delivery_partner" && <Link to="/delivery" className="hidden rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white lg:block">Deliveries</Link>}
            <button onClick={logout} className="hidden text-sm font-bold text-slate-500 hover:text-orange-600 lg:block">Logout</button>
          </> : <><Link to="/login" className="hidden text-sm font-bold text-slate-700 sm:block">Log in</Link><Link to="/register" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5">Sign up</Link></>}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
