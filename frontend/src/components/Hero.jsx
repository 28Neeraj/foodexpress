import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaLocationArrow, FaSearch, FaStar } from "react-icons/fa";
import { getRestaurants } from "../services/restaurantService";

function Hero() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => { getRestaurants().then(setRestaurants).catch(console.error); }, []);

  function handleSearch(event) {
    event?.preventDefault();
    const value = search.toLowerCase().trim();
    if (!value) return navigate("/restaurants");
    const restaurant = restaurants.find((item) =>
      item.name.toLowerCase().includes(value) || item.menu?.some((food) => food.name.toLowerCase().includes(value))
    );
    if (restaurant) navigate(`/restaurant/${restaurant._id}`);
    else navigate("/restaurants");
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#ff4d21]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,#ffb23e_0,transparent_24%),radial-gradient(circle_at_10%_90%,#c82812_0,transparent_30%)]" />
      <div className="page-shell relative grid min-h-[570px] items-center gap-10 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
        <div className="text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-lime-300" /> Delivering happiness, fast
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">
            Cravings, <span className="text-[#ffe08a]">answered.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">Your neighbourhood’s best food, delivered to your door with live tracking and zero fuss.</p>
          <form onSubmit={handleSearch} className="mt-9 flex max-w-2xl items-center gap-3 rounded-2xl bg-white p-2 shadow-2xl shadow-orange-950/20">
            <FaSearch className="ml-3 text-orange-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent py-3 text-slate-800 outline-none placeholder:text-slate-400" placeholder="Search biryani, pizza, restaurants…" />
            <button className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white transition hover:bg-slate-700 sm:px-5">Explore <FaArrowRight className="hidden sm:block" /></button>
          </form>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/90"><span className="flex items-center gap-2"><FaLocationArrow /> Live order tracking</span><span className="flex items-center gap-2"><FaStar className="text-[#ffe08a]" /> Rated local favourites</span></div>
        </div>
        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <div className="absolute -inset-7 rotate-6 rounded-[3rem] border border-white/20 bg-white/10" />
          <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-white/90 bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500"><span>FoodExpress</span><span className="rounded-full bg-green-100 px-2 py-1 text-green-700">24 min away</span></div>
            <div className="mt-5 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-200 p-7 text-center text-7xl">🍜</div>
            <div className="mt-5 flex items-center justify-between"><div><p className="font-extrabold text-slate-900">Your delicious order</p><p className="mt-1 text-sm text-slate-500">Freshly prepared nearby</p></div><div className="rounded-2xl bg-orange-500 px-3 py-2 font-black text-white">₹299</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
