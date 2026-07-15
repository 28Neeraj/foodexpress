import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

export default function Welcome() {
  return (
    <main className="min-h-screen grid place-items-center bg-[radial-gradient(circle_at_20%_20%,#fed7aa,transparent_32%),#fffaf7] p-4">
      <section className="w-full max-w-lg rounded-[2rem] border border-orange-100 bg-white p-10 text-center shadow-2xl shadow-orange-200/50">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-orange-500 text-4xl text-white"><FaUtensils /></div>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Your food journey starts here</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Welcome to FoodExpress!</h1>
        <p className="mt-4 text-slate-500">Discover great food from your favourite local restaurants.</p>
        <Link to="/restaurants" className="mt-8 inline-block rounded-xl bg-slate-900 px-6 py-4 font-bold text-white transition hover:bg-orange-500">Start ordering</Link>
      </section>
    </main>
  );
}
