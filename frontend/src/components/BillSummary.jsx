function BillSummary({ total, discount = 0, couponCode = "" }) {
  const delivery = 40;
  const gst = Math.round(total * 0.05);
  const finalTotal = Math.max(0, total + delivery + gst - discount);
  return <div className="sticky top-24 rounded-3xl border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/30">
    <h2 className="mb-6 text-3xl font-bold">Bill Details</h2>
    <div className="mb-3 flex justify-between"><span>Item Total</span><span>₹{total}</span></div>
    <div className="mb-3 flex justify-between"><span>Delivery Fee</span><span>₹{delivery}</span></div>
    <div className="mb-3 flex justify-between"><span>GST</span><span>₹{gst}</span></div>
    {discount > 0 && <div className="mb-3 flex justify-between font-semibold text-emerald-600"><span>Coupon discount {couponCode && `(${couponCode})`}</span><span>-₹{discount}</span></div>}
    <hr className="my-4" />
    <div className="flex justify-between text-xl font-bold"><span>Total</span><span>₹{finalTotal}</span></div>
  </div>;
}
export default BillSummary;
