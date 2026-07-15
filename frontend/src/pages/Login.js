import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNotification } from "../context/NotificationContext";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();
  const { showNotification } = useNotification();

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const data = await loginUser(
        email,
        password
      );

      login(data);

      if (data.isFirstLogin) {
        navigate("/welcome");
      } else {
        showNotification("Welcome back!");
        navigate("/");
      }

    } catch (error) {

      showNotification(
        error.response?.data?.message ||
        "Login failed.",
        "error"
      );

    }

  }

  return (

    <div className="min-h-screen grid place-items-center bg-[radial-gradient(circle_at_10%_10%,#fed7aa,transparent_30%),#fffaf7] p-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[2rem] border border-orange-100 bg-white p-8 shadow-2xl shadow-orange-200/50 sm:p-10"
      >

        <div className="mb-8 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-500 text-2xl text-white"><FaUtensils /></div><h1 className="text-3xl font-black">Welcome back</h1><p className="mt-2 text-slate-500">Sign in to continue your food journey.</p></div>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-5 w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full rounded-xl bg-slate-900 p-4 font-bold text-white transition hover:bg-orange-500"
        >

          Login

        </button>
        <div className="text-right mb-4">

  <button

    type="button"

    onClick={()=>
      navigate("/forgot-password")
    }

    className="text-sm font-bold text-orange-600"

  >

    Forgot Password?

  </button>

</div>
        <p className="mt-6 text-center text-sm text-slate-500">New to FoodExpress? <Link to="/register" className="font-bold text-orange-600">Create an account</Link></p>

      </form>

    </div>

  );

}

export default Login;
