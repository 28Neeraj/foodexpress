import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import { useNotification } from "../context/NotificationContext";

function ForgotPassword() {

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [email, setEmail] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await forgotPassword(email);

      showNotification("OTP page opened. Your code is being sent to your email.");

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (error) {

      showNotification(
        error.response?.data?.message || "Unable to send OTP.",
        "error"
      );

    }

  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-orange-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-[450px]"
      >

        <h1 className="text-3xl font-bold mb-8 text-center">

          Forgot Password

        </h1>

        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e)=>
            setEmail(e.target.value)
          }

          className="border p-4 rounded-lg w-full mb-6"

        />

        <button

          className="bg-red-500 text-white w-full p-4 rounded-lg"

        >

          Send OTP

        </button>

      </form>

    </div>

  );

}

export default ForgotPassword;
