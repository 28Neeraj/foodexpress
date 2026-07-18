import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import { getAddresses } from "../services/authService";
import { useNotification } from "../context/NotificationContext";
import { getCouponDiscount } from "../constants/coupons";
import { priceQuote } from "../utils/pricing";

function Checkout() {

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [cart, setCart] = useState(null);

  const [loading, setLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {

  loadCart();

  loadAddresses();

}, []);

  async function loadCart() {

    try {

      const data = await getCart();

      setCart(data);

    } catch (error) {

      console.log(error);

    }

  }
  async function loadAddresses() {

  try {

    const data = await getAddresses();

    setAddresses(data);

    const defaultAddress = data.find(
      (address) => address.isDefault
    );

    if (defaultAddress) {

      setSelectedAddress(defaultAddress._id);

      setDeliveryAddress(
        `${defaultAddress.house},
${defaultAddress.area},
${defaultAddress.city},
${defaultAddress.state}
-${defaultAddress.pincode}`
      );

    }

  } catch (error) {

    console.log(error);

  }

}

  const totalAmount =
    cart?.items?.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    ) || 0;
  const couponCode = sessionStorage.getItem("foodexpressCoupon") || "";
  const discount = getCouponDiscount(couponCode, totalAmount);
  const pricing = priceQuote(cart?.items || [], discount);
    async function handlePlaceOrder() {

  if (!selectedAddress) {

    showNotification("Please select a delivery address.", "error");

    return;

  }

  if (!paymentMethod) {

    showNotification("Please select a payment method.", "error");

    return;

  }

  try {

    setLoading(true);

    const result = await placeOrder({

      deliveryAddress,

      paymentMethod,
      couponCode,

    });

    navigate(`/order/${result.order._id}`);

  } catch (error) {

    showNotification(
      error.response?.data?.message ||
      "Failed to place order.",
      "error"
    );

  } finally {

    setLoading(false);

  }

}
  return (
    <>
      <Navbar />

      <main className="page-shell max-w-6xl py-10">

        <p className="section-kicker">Almost there</p><h1 className="section-title mb-8">
          Checkout
        </h1>

        {!cart || cart.items.length === 0 ? (

          <div className="text-center mt-20">

            <h2 className="text-2xl font-bold mb-4">
              Your Cart is Empty
            </h2>

            <button
              onClick={() => navigate("/restaurants")}
              className="bg-red-500 text-white px-6 py-3 rounded-lg"
            >
              Browse Restaurants
            </button>

          </div>

        ) : (

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_.8fr]">

            <div>

              <h2 className="text-2xl font-bold mb-4">
                Delivery Address
              </h2>
              <h2 className="text-2xl font-bold mb-4">
  Select Delivery Address
</h2>

{addresses.length === 0 ? (
    

  <div className="mb-6">

    <p className="text-red-500 mb-3">
      No saved addresses found.
    </p>

    <button
      onClick={() => navigate("/addresses")}
      className="bg-blue-500 text-white px-5 py-2 rounded-lg"
    >
      Add Address
    </button>

  </div>
  

) : (

  <div className="space-y-4 mb-6">

    {addresses.map((address) => (

      <label
        key={address._id}
        className={`block border rounded-lg p-4 cursor-pointer ${
          selectedAddress === address._id
            ? "border-red-500 bg-red-50"
            : ""
        }`}
      >

        <input
          type="radio"
          className="mr-3"
          checked={
            selectedAddress === address._id
          }
          onChange={() => {

            setSelectedAddress(address._id);

            setDeliveryAddress(
              `${address.house},
${address.area},
${address.city},
${address.state}
-${address.pincode}`
            );

          }}
        />

        <strong>

          {address.fullName}

        </strong>

        {address.isDefault && (

          <span className="ml-3 bg-green-500 text-white px-2 py-1 rounded text-sm">

            Default

          </span>

        )}

        <p className="mt-2">

          {address.house},
          {" "}
          {address.area}

        </p>

        <p>

          {address.city},
          {" "}
          {address.state}
          {" "}
          -
          {" "}
          {address.pincode}

        </p>

        <p>

          {address.mobile}

        </p>

      </label>

    ))}

  </div>

)}
              <textarea
                rows="5"
                value={deliveryAddress}
                readOnly
                onChange={(e) =>
                  setDeliveryAddress(e.target.value)
                }
                placeholder="Enter Full Delivery Address"
                className="w-full border rounded-lg p-4 mb-6"
              />
              <button
  type="button"
  onClick={() => navigate("/addresses")}
  className="text-blue-600 font-semibold mb-6"
>
  Manage Addresses
</button>

              <h2 className="text-2xl font-bold mb-4">
                Payment Method
              </h2>
<div className="space-y-3">

  {[
    "Cash on Delivery",
    "UPI",
    "Credit Card",
    "Debit Card",
  ].map((method) => (

    <label
      key={method}
      className={`block border rounded-lg p-4 cursor-pointer ${
        paymentMethod === method
          ? "border-red-500 bg-red-50"
          : ""
      }`}
    >

      <input
        type="radio"
        checked={paymentMethod === method}
        onChange={() =>
          setPaymentMethod(method)
        }
        className="mr-3"
      />

      {method}

    </label>

  ))}

</div>
            </div>

            <div className="h-fit bg-white shadow-lg rounded-xl p-6 lg:sticky lg:top-24">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              {cart.items.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between border-b py-3"
                >

                  <div>

                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <div className="font-bold">

                    ₹{item.price * item.quantity}

                  </div>

                </div>

              ))}

              <div className="mt-6 space-y-3 border-t pt-4 text-sm"><div className="flex justify-between"><span>Restaurant base subtotal</span><span>₹{pricing.baseSubtotal}</span></div><div className="flex justify-between"><span>Platform commission (12%)</span><span>₹{pricing.platformCommission}</span></div><div className="flex justify-between"><span>GST (18%)</span><span>₹{pricing.gst}</span></div><div className="flex justify-between"><span>Delivery fee</span><span>₹{pricing.deliveryFee}</span></div><div className="flex justify-between"><span>Platform fee</span><span>₹{pricing.platformFee}</span></div><div className="flex justify-between"><span>Packaging charge</span><span>₹{pricing.packagingCharge}</span></div>{discount > 0 && <div className="flex justify-between font-semibold text-emerald-700"><span>{couponCode} discount</span><span>-₹{discount}</span></div>}</div><div className="mt-5 flex justify-between border-t pt-5 text-2xl font-black"><span>Amount to pay</span><span>₹{pricing.total}</span></div>

              <button
  onClick={handlePlaceOrder}
  disabled={
    loading ||
    !selectedAddress
  }
  className={`w-full mt-8 py-4 rounded-lg text-lg font-bold ${
    loading || !selectedAddress
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-500 hover:bg-red-600 text-white"
  }`}
>

  {loading
    ? "Placing Order..."
    : "Place Order"}

</button>


            </div>

          </div>

        )}

      </main>
    </>
  );

}

export default Checkout;
