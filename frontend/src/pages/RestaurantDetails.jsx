import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import CouponCard from "../components/CouponCard";
import RecommendedFoods from "../components/RecommendedFoods";
import ReviewSection from "../components/ReviewSection";
import ImageWithFallback from "../components/ImageWithFallback";

import Navbar from "../components/Navbar";
import { getRestaurant } from "../services/restaurantService";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const data = await getRestaurant(id);
        setRestaurant(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const filteredMenu = useMemo(() => {
    if (!restaurant) return [];

    return restaurant.menu.filter((food) => {
      const searchMatch =
        food.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" ||
        food.category === category;

      return searchMatch && categoryMatch;
    });
  }, [restaurant, search, category]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-4xl font-bold">
          Loading...
        </div>
      </>
    );
  }

  if (!restaurant) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-4xl font-bold">
          Restaurant Not Found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 mt-10">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          type="restaurant"
          className="w-full h-[420px] rounded-2xl object-cover"
        />

        <h1 className="text-5xl font-bold mt-8">
          {restaurant.name}
        </h1>

        <p className="text-gray-600 mt-4">
          {restaurant.description}
        </p>

        <div className="flex gap-8 mt-6">
          <p>⭐ {restaurant.rating}</p>
          <p>🚚 {restaurant.delivery}</p>
          <p>📍 {restaurant.address}</p>
        </div>
        <p className="mt-4 font-semibold">
          🚚 Delivery Fee : ₹{restaurant.deliveryFee}
        </p>

        <p className="text-green-600 font-bold mt-2">
          🎉 {restaurant.offer}
        </p>

        <input
          type="text"
          placeholder="Search Food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border mt-10 p-4 rounded-xl"
        />

        <div className="flex gap-4 mt-8 flex-wrap">
          <button
            onClick={() => setCategory("All")}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            All
          </button>

          <button
            onClick={() => setCategory("Burger")}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Burger
          </button>

          <button
            onClick={() => setCategory("Pizza")}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Pizza
          </button>

          <button
            onClick={() => setCategory("Chicken")}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Chicken
          </button>

          <button
            onClick={() => setCategory("Biryani")}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Biryani
          </button>

          <button
            onClick={() => setCategory("Salad")}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Salad
          </button>
        </div>

        <h2 className="text-4xl font-bold mt-12 mb-8">
          Menu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((food) => (
              <MenuCard
                key={food._id}
                food={food}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-2xl font-semibold text-gray-500">
              No food found 🍔
            </div>
          )}
        </div>
        <CouponCard />

        <RecommendedFoods
          menu={restaurant.menu}
        />

        <ReviewSection />
      </div>
    </>
  );
}

export default RestaurantDetails;