import { useState } from "react";
import { FaCheckCircle, FaTicketAlt } from "react-icons/fa";
import { COUPONS } from "../constants/coupons";

function CouponPanel({ subtotal, appliedCoupon, onApply, onRemove }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  function applyCoupon(value = code) {
    const coupon = COUPONS.find((item) => item.code === value.trim().toUpperCase());
    if (!coupon) return setMessage("That coupon code is not valid.");
    if (subtotal < coupon.minOrder) return setMessage(`Add ₹${coupon.minOrder - subtotal} more to use ${coupon.code}.`);
    onApply(coupon.code); setCode(""); setMessage("");
  }
  return <section className="mt-8 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 text-orange-600"><FaTicketAlt /></span><div><h2 className="font-extrabold text-slate-900">Offers & coupons</h2><p className="text-sm text-slate-500">Apply one coupon to this order</p></div></div>
    {appliedCoupon ? <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-50 p-3 text-emerald-700"><span className="flex items-center gap-2 font-bold"><FaCheckCircle /> {appliedCoupon} applied</span><button onClick={onRemove} className="text-sm font-bold underline">Remove</button></div> : <><div className="mt-4 flex gap-2"><input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} onKeyDown={(event) => event.key === "Enter" && applyCoupon()} placeholder="Enter coupon code" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold uppercase outline-none focus:border-orange-400" /><button onClick={() => applyCoupon()} className="rounded-xl bg-slate-900 px-5 font-bold text-white hover:bg-orange-500">Apply</button></div>{message && <p className="mt-2 text-sm font-semibold text-red-600">{message}</p>}</>}
    <div className="mt-5 grid gap-3 sm:grid-cols-3">{COUPONS.map((coupon) => <button key={coupon.code} disabled={Boolean(appliedCoupon)} onClick={() => applyCoupon(coupon.code)} className="rounded-xl border border-orange-100 p-3 text-left transition hover:border-orange-400 hover:bg-orange-50 disabled:opacity-60"><p className="font-extrabold text-orange-600">{coupon.title}</p><p className="mt-1 text-xs text-slate-500">{coupon.description}</p><p className="mt-2 text-xs font-black tracking-wide text-slate-700">{coupon.code}</p></button>)}</div>
  </section>;
}

export default CouponPanel;
