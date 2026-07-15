import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import BillSummary from "../components/BillSummary";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import ImageWithFallback from "../components/ImageWithFallback";
import { useState } from "react";
import CouponPanel from "../components/CouponPanel";
import { getCouponDiscount } from "../constants/coupons";

function Cart() {

  const {
    cart,
    increase,
    decrease,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState(() => sessionStorage.getItem("foodexpressCoupon") || "");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = getCouponDiscount(couponCode, total);

  function applyCoupon(code) {
    setCouponCode(code);
    sessionStorage.setItem("foodexpressCoupon", code);
  }

  function removeCoupon() {
    setCouponCode("");
    sessionStorage.removeItem("foodexpressCoupon");
  }

  return (
    <>
      <Navbar />

      <main className="page-shell mt-10 pb-16">

        <p className="section-kicker">Ready when you are</p><h1 className="section-title mb-10">
          My Cart
        </h1>

        {cart.length === 0 ? (

          <h2 className="text-2xl text-center">
            Cart is Empty 😔
          </h2>

        ) : (

          <>
            {cart.map((item) => (

              <div
                key={item.foodId}
                className="mb-4 flex flex-col gap-5 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex gap-5 items-center">

                  <ImageWithFallback
                    src={item.image}
                    alt={item.foodName}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.foodName}
                    </h2>

                    <p className="text-red-500 font-bold mt-2">
                      ₹{item.price}
                    </p>

                  </div>

                </div>

                <div className="flex flex-wrap items-center gap-3">

                  <button
                    onClick={() => decrease(item.foodId)}
                    aria-label={`Decrease ${item.foodName} quantity`}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-orange-200 bg-orange-50 font-bold text-orange-600 transition hover:bg-orange-100"
                  >
                    <FaMinus className="text-xs" />
                  </button>

                  <h2 aria-label={`Quantity ${item.quantity}`} className="grid h-10 min-w-10 place-items-center rounded-xl bg-slate-100 px-3 text-lg font-black text-slate-800">
                    {item.quantity}
                  </h2>

                  <button
                    onClick={() => increase(item.foodId)}
                    aria-label={`Increase ${item.foodName} quantity`}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 font-bold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    <FaPlus className="text-xs" />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.foodId)}
                    aria-label={`Remove ${item.foodName} from cart`}
                    className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <FaTrash className="text-sm" />
                  </button>

                </div>

              </div>

            ))}

            <div className="text-right mt-10">

              <CouponPanel subtotal={total} appliedCoupon={couponCode} onApply={applyCoupon} onRemove={removeCoupon} />
              <BillSummary total={total} discount={discount} couponCode={couponCode} />

              <button
  onClick={() => navigate("/checkout")}
  className="mt-4 rounded-xl bg-slate-900 px-6 py-4 font-bold text-white transition hover:bg-orange-500"
>
  Proceed To Checkout
</button>

            </div>

          </>

        )}

      </main>

    </>
  );

}

export default Cart;
