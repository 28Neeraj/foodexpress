import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../services/authService";


function Profile() {

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [profileImage, setProfileImage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      const user = await getProfile();

      setName(user.name || "");

      setPhone(user.phone || "");

      setProfileImage(user.profileImage || "");

    } catch (error) {

      console.log(error);

    }

  }
  async function handleImageUpload(e) {

  const file = e.target.files[0];

  if (!file) return;

  try {

    setLoading(true);

    const imageUrl = await uploadProfileImage(file);

    setProfileImage(imageUrl);

  } catch (error) {
  console.log(error);
  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Image Upload Failed"
  );
}finally {

    setLoading(false);

  }

}
    async function handleSave() {

    try {

      setLoading(true);

      await updateProfile({

        name,

        phone,

        profileImage,

      });

      alert("Profile Updated Successfully");

    } catch (error) {

      alert(

        error.response?.data?.message ||

        "Something went wrong"

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <>
      <Navbar />

      <main className="page-shell max-w-3xl py-10">

        <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100 sm:p-10">

          <p className="section-kicker text-center">Account settings</p><h1 className="text-4xl font-black mb-8 text-center">

            My Profile

          </h1>

          <div className="flex flex-col items-center mb-8">

            <img

              src={
                profileImage ||

                "https://via.placeholder.com/150"
              }

              alt="Profile"

              className="h-36 w-36 rounded-full object-cover border-4 border-orange-400 p-1 shadow-lg"

            />

          </div>

          <div className="space-y-6">

            <div>

              <label className="font-semibold">

                Name

              </label>

              <input

                type="text"

                value={name}

                onChange={(e)=>

                  setName(e.target.value)

                }

                className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"

              />

            </div>

            <div>

              <label className="font-semibold">

                Phone

              </label>

              <input

                type="text"

                value={phone}

                onChange={(e)=>

                  setPhone(e.target.value)

                }

                className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"

              />

            </div>
                        <div>

              <label className="font-semibold">

                Profile Image URL

              </label>

              <input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="mt-2 w-full rounded-xl border border-slate-200 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-100 file:px-3 file:py-2 file:font-bold file:text-orange-700"
/>

            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 p-4 text-lg font-bold text-white transition hover:bg-orange-500 disabled:bg-slate-400"
            >

              {loading ? "Saving..." : "Save Profile"}

            </button>

          </div>

        </div>

      </main>

    </>

  );

}

export default Profile;
