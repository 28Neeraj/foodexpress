import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../services/authService";
import { useNotification } from "../context/NotificationContext";

function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const otp = location.state?.otp;
  const { showNotification } = useNotification();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    if (password !== confirmPassword) {

      showNotification("Passwords do not match.", "error");

      return;

    }

    try {

      await resetPassword(
        email,
        otp,
        password
      );

      showNotification("Password reset successfully. Please log in.");

      navigate("/login");

    } catch (error) {

      showNotification(

        error.response?.data?.message ||

        "Reset failed.",
        "error"

      );

    }

  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-orange-50">

      <form

        onSubmit={handleSubmit}

        className="bg-white shadow-xl rounded-xl p-10 w-[450px]"

      >

        <h1 className="text-3xl font-bold text-center mb-8">

          Reset Password

        </h1>

        <input

          type="password"

          placeholder="New Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          className="border w-full p-4 rounded-lg mb-5"

        />

        <input

          type="password"

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e)=>setConfirmPassword(e.target.value)}

          className="border w-full p-4 rounded-lg mb-8"

        />

        <button

          className="bg-red-500 hover:bg-red-600 text-white w-full p-4 rounded-lg"

        >

          Reset Password

        </button>

      </form>

    </div>

  );

}

export default ResetPassword;
