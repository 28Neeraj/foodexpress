import { useEffect, useState } from "react";

function AdminFoodForm({
  restaurants,
  onSubmit,
  editingFood,
}) {

  const [form, setForm] = useState({
    restaurantId: "",
    name: "",
    category: "",
    price: "",
    image: "",
    isAvailable: true,
  });

  useEffect(() => {

    if (editingFood) {

      setForm({
        restaurantId: editingFood.restaurantId,
        name: editingFood.name,
        category: editingFood.category,
        price: editingFood.price,
        image: editingFood.image,
        isAvailable: editingFood.isAvailable,
      });

    }

  }, [editingFood]);

  function handleChange(e) {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  }

  function handleSubmit(e) {

    e.preventDefault();

    onSubmit(form);

    setForm({
      restaurantId: "",
      name: "",
      category: "",
      price: "",
      image: "",
      isAvailable: true,
    });

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-xl p-6 mb-8"
    >

      <div className="grid grid-cols-2 gap-4">

        <select
          name="restaurantId"
          value={form.restaurantId}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >

          <option value="">

            Select Restaurant

          </option>

          {restaurants.map((restaurant) => (

            <option
              key={restaurant._id}
              value={restaurant._id}
            >

              {restaurant.name}

            </option>

          ))}

        </select>

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            name="isAvailable"
            checked={form.isAvailable}
            onChange={handleChange}
          />

          <label>

            Available

          </label>

        </div>

      </div>

      <button
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded mt-6"
      >

        {editingFood ? "Update Food" : "Add Food"}

      </button>

    </form>

  );

}

export default AdminFoodForm;