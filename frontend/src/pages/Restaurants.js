import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RestaurantCard from "../components/RestaurantCard";
import SearchBar from "../components/SearchBar";

import { getRestaurants } from "../services/restaurantService";

function Restaurants() {

  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {

    loadRestaurants();

  }, []);

  async function loadRestaurants() {

    try {

      const data = await getRestaurants();

      setRestaurants(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  const filteredRestaurants = restaurants.filter((restaurant) => {

    const restaurantMatch =
      restaurant.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const menuMatch =
      restaurant.menu.some((food)=>

        food.name
        .toLowerCase()
        .includes(search.toLowerCase())

      );

    return restaurantMatch || menuMatch;

  });

  return (

    <>

      <Navbar/>

      <SearchBar

      search={search}

      setSearch={setSearch}

      />

      <main className="page-shell mt-10 mb-16">

      <p className="section-kicker">Discover nearby flavours</p>

      <h1 className="section-title mb-10">

      Restaurants

      </h1>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-80 animate-pulse rounded-3xl bg-orange-100" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
      </main>

      <Footer/>

    </>

  );

}

export default Restaurants;
