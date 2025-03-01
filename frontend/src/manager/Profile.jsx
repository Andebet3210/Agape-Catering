import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profile = ({
  profilePicture,
  setProfilePicture,
  initialName,
  setPassword,
}) => {
  const [image, setImage] = useState(profilePicture || null); // Default to null if no prop is passed
  const [name, setName] = useState(initialName || ''); // Default name value
  const [password, setPasswordState] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Update the image and global state when it changes
  useEffect(() => {
    setImage(profilePicture);
  }, [profilePicture]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setImage(newImage); // Update local state
      if (setProfilePicture) {
        setProfilePicture(newImage); // Update global state if setProfilePicture is defined
      }
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && password.trim()) {
      // Assuming setPassword is a function to update the password in the parent component or context
      setPassword(password); // Update the password in the global state
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Please fill out all fields!');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400" />
          )}
          <label className="mt-4 cursor-pointer text-blue-600 hover:underline flex items-center gap-2">
            <FaUpload /> Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPasswordState(e.target.value)}
            required
          />
          <div
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
