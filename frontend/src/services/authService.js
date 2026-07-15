import api from "../api/api";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
};

export const addAddress = async (address) => {
  const { data } = await api.post(
    "/auth/address",
    address
  );

  return data;
};


export const forgotPassword = async (email) => {

  const { data } = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return data;

};

export const verifyOtp = async (email, otp) => {

  const { data } = await api.post(
    "/auth/verify-otp",
    {
      email,
      otp,
    }
  );

  return data;

};

export const resetPassword = async (
  email,
  otp,
  password
) => {

  const { data } = await api.post(
    "/auth/reset-password",
    {
      email,
      otp,
      password,
    }
  );

  return data;

};


export const getAddresses = async () => {
  const { data } = await api.get(
    "/auth/address"
  );

  return data;
};

export const deleteAddress = async (id) => {
  const { data } = await api.delete(
    `/auth/address/${id}`
  );

  return data;
};

export const setDefaultAddress = async (id) => {
  const { data } = await api.put(
    `/auth/address/default/${id}`
  );

  return data;
};

export const registerUser = async (name, email, password) => {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
};

export const getProfile = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const updateProfile = async (profileData) => {
  const { data } = await api.put(
    "/auth/profile",
    profileData
  );

  return data;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const { data } = await api.post(
    "/auth/upload-profile",
    formData
  );

  return data.image;
};