import { Link } from "react-router-dom";
import { FaHamburger, FaPizzaSlice, FaIceCream, FaCoffee } from "react-icons/fa";
import { GiNoodles, GiChickenLeg } from "react-icons/gi";
function CategorySection() {
  const categories = [{ name: "Burgers", icon: <FaHamburger /> }, { name: "Pizza", icon: <FaPizzaSlice /> }, { name: "Chicken", icon: <GiChickenLeg /> }, { name: "Noodles", icon: <GiNoodles /> }, { name: "Coffee", icon: <FaCoffee /> }, { name: "Desserts", icon: <FaIceCream /> }];
  return <section className="page-shell mt-16"><p className="section-kicker">What are you craving?</p><div className="mb-7 flex items-end justify-between"><h2 className="section-title">Explore by cuisine</h2><Link to="/restaurants" className="text-sm font-bold text-orange-600 hover:text-orange-700">See all restaurants →</Link></div><div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-5">{categories.map((item, index) => <Link to="/restaurants" key={item.name} className="group rounded-3xl border border-orange-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg sm:p-5"><div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl text-2xl ${index % 2 ? "bg-amber-100 text-amber-600" : "bg-orange-100 text-orange-600"}`}>{item.icon}</div><h3 className="mt-3 text-sm font-extrabold text-slate-700">{item.name}</h3></Link>)}</div></section>;
}
export default CategorySection;
