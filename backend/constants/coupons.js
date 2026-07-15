const coupons = {
  WELCOME50: { minOrder: 249, type: "flat", value: 50 },
  FEAST20: { minOrder: 499, type: "percent", value: 20, maxDiscount: 120 },
  FOODIE100: { minOrder: 699, type: "flat", value: 100 },
};

function calculateCouponDiscount(code, subtotal) {
  const coupon = coupons[(code || "").toUpperCase()];
  if (!coupon || subtotal < coupon.minOrder) return { code: "", discount: 0 };
  const rawDiscount = coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return { code: code.toUpperCase(), discount: Math.min(rawDiscount, coupon.maxDiscount || rawDiscount) };
}

module.exports = { calculateCouponDiscount };
