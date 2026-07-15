import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { getRestaurants } from "../services/restaurantService";

function PopularFoods() {

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadFoods();

  }, []);

  async function loadFoods() {

    try {

      const restaurants = await getRestaurants();

      const allFoods = restaurants
        .flatMap((restaurant) =>
          restaurant.menu.map((food) => ({
            ...food,
            restaurantName: restaurant.name,
            restaurantId: restaurant._id,
            restaurantRating: restaurant.rating,
            offer: restaurant.offer,
          }))
        )
        .filter((food) => food.isAvailable)
        .sort((a, b) => b.restaurantRating - a.restaurantRating);

      setFoods(allFoods);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="max-w-7xl mx-auto mt-24">

        <h1 className="text-4xl font-bold">

          Loading Popular Foods...

        </h1>

      </div>

    );

  }

  return (

    <div className="max-w-7xl mx-auto mt-24">

      <h1 className="text-4xl font-bold mb-10">

        🍕 Popular Foods

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {foods.slice(0, 9).map((food) => (

          <div key={food._id}>

            <FoodCard food={food} />

            <div className="mt-2 px-2">

              <p className="font-semibold">
                {food.restaurantName}
              </p>

              <p className="text-sm text-yellow-600">
                ⭐ {food.restaurantRating}
              </p>

              <p className="text-green-600 font-semibold">
                {food.offer}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default PopularFoods;