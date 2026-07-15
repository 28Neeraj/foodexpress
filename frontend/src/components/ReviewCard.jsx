import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant }) {

  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:scale-105 duration-300">

      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {restaurant.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {restaurant.description}
        </p>

        <div className="flex justify-between mt-5">

          <span className="flex items-center gap-2">

            <FaStar className="text-yellow-500"/>

            {restaurant.rating}

          </span>

          <span>

            {restaurant.delivery}

          </span>

        </div>

        <p className="mt-4">

          📍 {restaurant.address}

        </p>

        <p className="mt-2 font-semibold">

          🚚 Delivery Fee : ₹{restaurant.deliveryFee}

        </p>

        <p className="text-green-600 font-bold mt-2">

          🎉 {restaurant.offer}

        </p>

        <button

          onClick={() => navigate(`/restaurant/${restaurant._id}`)}

          className="w-full mt-5 bg-red-500 text-white p-3 rounded-xl hover:bg-red-600"

        >

          View Menu

        </button>

      </div>

    </div>

  );

}

export default RestaurantCard;