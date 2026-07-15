import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getOrderTracking } from "../services/deliveryService";

function LiveOrderMap({ orderId }) {
  const [tracking, setTracking] = useState(null);
  useEffect(() => { const load = () => getOrderTracking(orderId).then(setTracking).catch(() => {}); load(); const timer = setInterval(load, 15000); return () => clearInterval(timer); }, [orderId]);
  const location = tracking?.partner?.deliveryLocation;
  if (!tracking?.partner) return <div className="mt-6 rounded-2xl bg-orange-50 p-4 text-sm font-semibold text-orange-700">A delivery partner will be assigned soon.</div>;
  return <section className="mt-6 overflow-hidden rounded-2xl border border-orange-100 bg-white"><div className="flex items-center gap-3 p-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-600"><FaMapMarkerAlt /></div><div><p className="font-extrabold">{tracking.partner.name} is handling your order</p><p className="text-sm text-slate-500">{location?.isOnline ? "Live location updated" : "Location temporarily unavailable"}</p></div></div>{location?.latitude && <iframe title="Live delivery location" className="h-64 w-full border-0" src={`https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&center=${location.latitude},${location.longitude}&zoom=15&maptype=roadmap`} />}</section>;
}
export default LiveOrderMap;
