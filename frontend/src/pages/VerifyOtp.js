import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifyOtp } from "../services/authService";
import { useNotification } from "../context/NotificationContext";

function VerifyOtp() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;
  const { showNotification } = useNotification();

  const [otp, setOtp] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await verifyOtp(email, otp);

      showNotification("OTP verified successfully.");

      navigate("/reset-password", {

        state: {

          email,

          otp,

        },

      });

    } catch (error) {

      showNotification(

        error.response?.data?.message ||

        "Invalid OTP",
        "error"

      );

    }

  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-orange-50">

      <form

        onSubmit={handleSubmit}

        className="bg-white shadow-lg rounded-xl p-10 w-[450px]"

      >

        <h1 className="text-3xl font-bold mb-8 text-center">

          Verify OTP

        </h1>

        <input

          type="text"

          placeholder="Enter OTP"

          value={otp}

          onChange={(e)=>setOtp(e.target.value)}

          className="border w-full p-4 rounded-lg mb-6"

        />

        <button

          className="bg-red-500 text-white w-full p-4 rounded-lg"

        >

          Verify OTP

        </button>

      </form>

    </div>

  );

}

export default VerifyOtp;
