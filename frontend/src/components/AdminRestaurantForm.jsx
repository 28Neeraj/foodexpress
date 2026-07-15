import { useEffect, useState } from "react";

function AdminRestaurantForm({ onSubmit, restaurant }) {

  const [form, setForm] = useState({
    name: "",
    image: "",
    rating: "",
    delivery: "",
    address: "",
    description: "",
  });

  useEffect(() => {

    if (restaurant) {

      setForm({
        name: restaurant.name || "",
        image: restaurant.image || "",
        rating: restaurant.rating || "",
        delivery: restaurant.delivery || "",
        address: restaurant.address || "",
        description: restaurant.description || "",
      });

    }

  }, [restaurant]);

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  function handleSubmit(e) {

    e.preventDefault();

    onSubmit(form);

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mb-8"
    >

      <div className="grid grid-cols-2 gap-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
          className="border p-3 rounded"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-3 rounded"
        />

        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="border p-3 rounded"
        />

        <input
          name="delivery"
          value={form.delivery}
          onChange={handleChange}
          placeholder="Delivery Time"
          className="border p-3 rounded"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-3 rounded"
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded"
        />

      </div>

      <button className="bg-green-500 text-white px-6 py-3 rounded mt-5">

        {restaurant ? "Update Restaurant" : "Save Restaurant"}

      </button>

    </form>

  );

}

export default AdminRestaurantForm;