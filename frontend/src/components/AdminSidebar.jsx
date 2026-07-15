import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        Admin
      </h1>

      <div className="flex flex-col gap-5">

        <Link to="/admin">
          Dashboard
        </Link>

        <Link to="/admin/users">
          Users
        </Link>

        <Link to="/admin/restaurants">
          Restaurants
        </Link>
        <Link
  to="/admin/foods"
  className="block py-3"
>

  Foods

</Link>

        <Link to="/admin/orders">
          Orders
        </Link>

      </div>

    </div>
  );
}

export default AdminSidebar;