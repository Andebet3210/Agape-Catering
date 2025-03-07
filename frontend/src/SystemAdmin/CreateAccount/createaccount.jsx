import React, { useState } from "react";
import axiosInstance from "../axiosInstance"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

const CreateAccount = () => {
  const navigate = useNavigate();

  // Initial user state
  const initialUser = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    role: "",
    password: "",
    photo: null, // Changed to null for file upload
  };

  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setUser({ ...user, [name]: files[0] }); // Handle file upload
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in user) {
      formData.append(key, user[key]);
    }

    try {
      
      const response = await axiosInstance.post('/api/staff/createaccount', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("User Registered Successfully!");
        navigate("/system");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      console.error("Error Response:", error.response);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar (Placeholder) */}
      <div className="w-1/4 bg-gray-200 p-4">
        {/* Sidebar content goes here */}
        <h3 className="text-lg font-bold">Sidebar</h3>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-8">
        <TiArrowBack
          size={30}
          onClick={() => navigate(-1)}
          className="cursor-pointer text-teal-600 hover:text-teal-700 transition-colors"
        />
        <h2 className="text-3xl font-bold mb-8 text-teal-600">Add New System User</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="******"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Role</label>
              <select
                name="role"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              >
                <option value="">Select Role</option>
                <option value="ExecutiveChef">Executive Chef</option>
                <option value="CateringManager">Catering Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Profile Picture</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                accept="image/*"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;