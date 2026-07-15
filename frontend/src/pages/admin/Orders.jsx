import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/adminService";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {

    try {

      const data = await getAllOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);

    }

  }

  async function handleStatus(id, status) {

    try {

      await updateOrderStatus(id, status);

      loadOrders();

    } catch (error) {

      console.log(error);

    }

  }

  const filteredOrders = orders.filter((order) => {

    const matchSearch =
      order.user?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      status === "All" ||
      order.status === status;

    return matchSearch && matchStatus;

  });

  return (

    <>
      <Navbar />

      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-8">

            Orders Management

          </h1>

          <div className="flex gap-5 mb-8">

            <input
              type="text"
              placeholder="Search Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-3 rounded-lg w-80"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded-lg"
            >

              <option>All</option>
              <option>Pending</option>
              <option>Preparing</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>

            </select>

          </div>

          <table className="w-full shadow-lg">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">Customer</th>
                <th className="p-3">Email</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b text-center"
                >

                  <td className="p-3">

                    {order.user?.name}

                  </td>

                  <td>

                    {order.user?.email}

                  </td>

                  <td>

                    ₹{order.totalAmount}

                  </td>

                  <td className="p-3">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded p-2"
                    >

                      <option>Pending</option>

                      <option>Preparing</option>

                      <option>Out for Delivery</option>

                      <option>Delivered</option>

                    </select>

                  </td>

                  <td>

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td>

                    <button
  onClick={() => setSelectedOrder(order)}
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  View
</button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
          {selectedOrder && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white rounded-xl shadow-xl w-[700px] max-h-[90vh] overflow-y-auto p-8">

<div className="flex justify-between items-center mb-6">

<h2 className="text-3xl font-bold">

Order Details

</h2>

<button
onClick={()=>setSelectedOrder(null)}
className="text-red-500 text-2xl"
>

✕

</button>

</div>

<hr className="mb-6"/>

<h3 className="text-xl font-bold mb-3">

👤 Customer

</h3>

<p>

<b>Name :</b>

{selectedOrder.user?.name}

</p>

<p>

<b>Email :</b>

{selectedOrder.user?.email}

</p>

<hr className="my-5"/>

<h3 className="text-xl font-bold mb-3">

💰 Payment

</h3>

<p>

<b>Total :</b>

₹{selectedOrder.totalAmount}

</p>

<p>

<b>Status :</b>

{selectedOrder.status}

</p>

<hr className="my-5"/>

<h3 className="text-xl font-bold mb-3">

🍔 Ordered Items

</h3>

{

selectedOrder.items?.map((item,index)=>(

<div
key={index}
className="flex justify-between border-b py-3"
>

<span>

{item.name}

</span>

<span>

Qty : {item.quantity}

</span>

<span>

₹{item.price}

</span>

</div>

))

}

<hr className="my-5"/>

<h3 className="text-xl font-bold mb-3">

📍 Delivery Address

</h3>

<p>

{selectedOrder.address || "No Address"}

</p>

<hr className="my-5"/>

<h3 className="text-xl font-bold mb-3">

🕒 Order Date

</h3>

<p>

{

new Date(selectedOrder.createdAt)

.toLocaleString()

}

</p>

</div>

</div>

)}

        </div>

      </div>

    </>

  );

}

export default Orders;