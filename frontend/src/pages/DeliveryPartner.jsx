import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { getMyDeliveries, updateDeliveryLocation, updateDeliveryStatus } from "../services/deliveryService";

function DeliveryPartner() {
  const [deliveries, setDeliveries] = useState([]); const [message, setMessage] = useState("Location is off");
  const load = () => getMyDeliveries().then(setDeliveries).catch((e) => setMessage(e.response?.data?.message || "Unable to load deliveries"));
  useEffect(() => { load(); }, []);
  const shareLocation = () => navigator.geolocation?.getCurrentPosition(async ({ coords }) => { await updateDeliveryLocation(coords); setMessage("Live location shared with customers"); }, () => setMessage("Please allow location permission"));
  return <main className="page-shell py-10"><p className="section-kicker">Delivery partner</p><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="section-title">Today’s deliveries</h1><button onClick={shareLocation} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white"><FaLocationArrow /> Go online</button></div><p className="mt-3 text-sm text-slate-500">{message}</p><div className="mt-8 grid gap-5">{deliveries.map((order) => <article key={order._id} className="soft-card p-6"><div className="flex flex-wrap justify-between gap-4"><div><h2 className="text-xl font-black">Order #{order._id.slice(-6)}</h2><p className="mt-2 whitespace-pre-line text-slate-600">{order.deliveryAddress}</p></div><select value={order.orderStatus} onChange={async (e) => { await updateDeliveryStatus(order._id, e.target.value); load(); }} className="h-fit p-3 font-bold"><option>Preparing</option><option>Out for Delivery</option><option>Delivered</option></select></div></article>)}{!deliveries.length && <div className="soft-card p-10 text-center text-slate-500">No delivery orders assigned yet.</div>}</div></main>;
}
export default DeliveryPartner;
