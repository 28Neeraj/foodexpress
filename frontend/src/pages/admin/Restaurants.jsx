import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import AdminRestaurantForm from "../../components/AdminRestaurantForm";

import {
  getAllRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../services/adminService";

function Restaurants() {

  const [restaurants, setRestaurants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  useEffect(() => {
    loadRestaurants();
  }, []);

  async function loadRestaurants() {

    try {

      const data = await getAllRestaurants();

      setRestaurants(data);

    } catch (error) {

      console.log(error);

    }

  }

  async function handleSave(form) {

    try {

      if (editingRestaurant) {

        await updateRestaurant(
          editingRestaurant._id,
          form
        );

      } else {

        await addRestaurant(form);

      }

      setEditingRestaurant(null);

      setShowForm(false);

      loadRestaurants();

    } catch (error) {

      console.log(error);

    }

  }

  async function handleDelete(id) {

    if (!window.confirm("Delete Restaurant?")) return;

    try {

      await deleteRestaurant(id);

      loadRestaurants();

    } catch (error) {

      console.log(error);

    }

  }

  function handleEdit(restaurant) {

    setEditingRestaurant(restaurant);

    setShowForm(true);

  }

  function handleAddNew() {

    setEditingRestaurant(null);

    setShowForm(true);

  }

  return (

    <>
      <Navbar />

      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 p-8">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-4xl font-bold">

              Restaurants Management

            </h1>

            <button
              onClick={handleAddNew}
              className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600"
            >

              + Add Restaurant

            </button>

          </div>

          {showForm && (

            <AdminRestaurantForm
              restaurant={editingRestaurant}
              onSubmit={handleSave}
            />

          )}

          <table className="w-full border shadow-lg">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">Image</th>

                <th className="p-3">Name</th>

                <th className="p-3">Rating</th>

                <th className="p-3">Delivery</th>

                <th className="p-3">Actions</th>

              </tr>

            </thead>

            <tbody>

              {restaurants.map((restaurant) => (

                <tr
                  key={restaurant._id}
                  className="border-t"
                >

                  <td className="p-3">

                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-24 h-16 object-cover rounded"
                    />

                  </td>

                  <td className="p-3 font-semibold">

                    {restaurant.name}

                  </td>

                  <td className="p-3">

                    ⭐ {restaurant.rating}

                  </td>

                  <td className="p-3">

                    {restaurant.delivery}

                  </td>

                  <td className="p-3">

                    <button
                      onClick={() => handleEdit(restaurant)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-3 hover:bg-blue-600"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() => handleDelete(restaurant._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

}

export default Restaurants;