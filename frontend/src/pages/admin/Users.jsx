import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import { getAllUsers } from "../../services/adminService";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {

    try {

      const data = await getAllUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <>
      <Navbar />

      <div className="flex">

        <AdminSidebar />

        <div className="flex-1 p-8">

          <h1 className="text-4xl font-bold mb-8">

            Users Management

          </h1>

          <table className="w-full border shadow-lg">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">Name</th>

                <th className="p-3">Email</th>

                <th className="p-3">Role</th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                  className="border-t"
                >

                  <td className="p-3">
                    {user.name}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">
                    {user.role}
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

export default Users;