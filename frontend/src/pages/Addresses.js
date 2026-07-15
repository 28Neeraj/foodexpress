import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  addAddress,
  getAddresses,
  deleteAddress,
  setDefaultAddress,
} from "../services/authService";

function Addresses() {

  const [addresses, setAddresses] = useState([]);

  const [form, setForm] = useState({

    fullName: "",

    mobile: "",

    house: "",

    area: "",

    city: "",

    state: "",

    pincode: "",

    landmark: "",

  });

  useEffect(() => {

    loadAddresses();

  }, []);

  async function loadAddresses() {

    try {

      const data = await getAddresses();

      setAddresses(data);

    } catch (error) {

      console.log(error);

    }

  }
    function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await addAddress(form);

      setForm({

        fullName: "",

        mobile: "",

        house: "",

        area: "",

        city: "",

        state: "",

        pincode: "",

        landmark: "",

      });

      loadAddresses();

    } catch (error) {

      console.log(error);

    }

  }

  async function handleDelete(id) {

    await deleteAddress(id);

    loadAddresses();

  }

  async function handleDefault(id) {

    await setDefaultAddress(id);

    loadAddresses();

  }

  return (

    <>

      <Navbar />

      <main className="page-shell max-w-5xl py-10">

        <p className="section-kicker">Saved locations</p><h1 className="section-title mb-8">

          My Addresses

        </h1>

        <form

          onSubmit={handleSubmit}

          className="grid grid-cols-1 gap-4 bg-white shadow-lg rounded-xl p-6 sm:grid-cols-2"

        >

          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded"
          />

          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="border p-3 rounded"
          />

          <input
            name="house"
            value={form.house}
            onChange={handleChange}
            placeholder="House / Flat"
            className="border p-3 rounded"
          />

          <input
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Area"
            className="border p-3 rounded"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-3 rounded"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-3 rounded"
          />

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border p-3 rounded"
          />

          <input
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            placeholder="Landmark"
            className="border p-3 rounded"
          />

          <button

            className="col-span-1 rounded-xl bg-slate-900 p-4 text-lg font-bold text-white hover:bg-orange-500 sm:col-span-2"

          >

            Add Address

          </button>

        </form>
                <div className="grid gap-5 mt-10">

          {addresses.map((address) => (

            <div
              key={address._id}
              className="bg-white shadow-lg rounded-xl p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-bold">

                    {address.fullName}

                  </h2>

                  <p>{address.mobile}</p>

                  <p className="mt-2">

                    {address.house}, {address.area}

                  </p>

                  <p>

                    {address.city}, {address.state}

                  </p>

                  <p>

                    {address.pincode}

                  </p>

                  {address.landmark && (

                    <p>

                      Landmark: {address.landmark}

                    </p>

                  )}

                </div>

                {address.isDefault && (

                  <span className="bg-green-500 text-white px-3 py-1 rounded-full">

                    Default

                  </span>

                )}

              </div>

              <div className="flex gap-4 mt-6">

                {!address.isDefault && (

                  <button
                    onClick={() =>
                      handleDefault(address._id)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >

                    Set Default

                  </button>

                )}

                <button
                  onClick={() =>
                    handleDelete(address._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </>

  );

}

export default Addresses;
