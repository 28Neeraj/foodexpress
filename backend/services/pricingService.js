const round = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
exports.quote = (items, couponDiscount = 0) => {
  const baseSubtotal = round(items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0));
  const platformCommission = round(baseSubtotal * 0.12);
  const gst = round((baseSubtotal + platformCommission) * 0.18);
  const deliveryFee = baseSubtotal >= 399 ? 0 : 35;
  const platformFee = 6;
  const packagingCharge = Math.max(10, Math.min(35, items.length * 10));
  const discount = Math.min(Number(couponDiscount) || 0, baseSubtotal);
  const total = round(Math.max(0, baseSubtotal + platformCommission + gst + deliveryFee + platformFee + packagingCharge - discount));
  return { baseSubtotal, platformCommission, gst, deliveryFee, platformFee, packagingCharge, discount, total };
};
