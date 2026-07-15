import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import LiveOrderMap from "../components/LiveOrderMap";
import { getOrderById } from "../services/orderService";

export default function OrderSuccess() {
  const { id } = useParams(); const [order, setOrder] = useState(null);
  useEffect(() => { getOrderById(id).then(setOrder).catch(console.error); }, [id]);
  if (!order) return <><Navbar /><div className="page-shell py-20 text-center font-bold">Loading your order…</div></>;
  return <><Navbar /><main className="page-shell max-w-3xl py-10"><section className="rounded-[2rem] bg-slate-900 p-10 text-center text-white"><FaCheckCircle className="mx-auto animate-bounce text-7xl text-green-400" /><p className="mt-5 text-sm font-bold uppercase tracking-widest text-orange-300">Order confirmed</p><h1 className="mt-2 text-4xl font-black">Your food is being prepared!</h1><p className="mt-3 text-slate-300">Order #{order._id.slice(-6)} · ₹{order.totalAmount}</p></section><section className="mt-6 rounded-3xl border border-orange-100 bg-white p-6"><h2 className="text-xl font-black">Track this order</h2><LiveOrderMap orderId={order._id} /></section><Link to="/orders" className="mt-6 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-white">View all orders</Link></main></>;
}
