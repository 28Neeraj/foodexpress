import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

function Register() {

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);

      showNotification("Account created. Please log in to continue.");

      navigate("/login");

    } catch (error) {

      showNotification(
        error.response?.data?.message || "Registration failed.",
        "error"
      );

    }

  }

  return (

    <div className="min-h-screen grid place-items-center bg-[radial-gradient(circle_at_90%_10%,#fed7aa,transparent_30%),#fffaf7] p-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2rem] border border-orange-100 bg-white p-8 shadow-2xl shadow-orange-200/50 sm:p-10"
      >

        <div className="mb-8 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-500 text-2xl text-white"><FaUtensils /></div><h1 className="text-3xl font-black">Create your account</h1><p className="mt-2 text-slate-500">Great meals are a few clicks away.</p></div>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-5 w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />

        <button
          className="w-full rounded-xl bg-slate-900 p-4 font-bold text-white transition hover:bg-orange-500"
        >

          Create Account

        </button>

        <p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-bold text-orange-600">Log in</Link></p></form>

    </div>

  );

}

export default Register;
