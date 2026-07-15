export const COUPONS = [
  { code: "WELCOME50", title: "₹50 off", description: "On orders above ₹249", minOrder: 249, type: "flat", value: 50 },
  { code: "FEAST20", title: "20% off up to ₹120", description: "On orders above ₹499", minOrder: 499, type: "percent", value: 20, maxDiscount: 120 },
  { code: "FOODIE100", title: "₹100 off", description: "On orders above ₹699", minOrder: 699, type: "flat", value: 100 },
];

export function getCouponDiscount(code, subtotal) {
  const coupon = COUPONS.find((item) => item.code === code?.toUpperCase());
  if (!coupon || subtotal < coupon.minOrder) return 0;
  const rawDiscount = coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.min(rawDiscount, coupon.maxDiscount || rawDiscount);
}
