// src/components/UserManagement.js

import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });
  const [isEditing, setIsEditing] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing !== null) {
      const updatedUsers = users.map((user, index) => (index === isEditing ? userData : user));
      setUsers(updatedUsers);
      setIsEditing(null);
    } else {
      setUsers([...users, userData]);
    }
    setUserData({ name: '', email: '', role: '' });
  };

  const handleEdit = (index) => {
    setUserData(users[index]);
    setIsEditing(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border rounded-md p-2 w-full mb-2"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border rounded-md p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="role"
          value={userData.role}
          onChange={handleChange}
          placeholder="Role"
          className="border rounded-md p-2 w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          {isEditing !== null ? 'Update Account' : 'Create Account'}
        </button>
      </form>

      <ul className="space-y-4">
        {users.map((user, index) => (
          <li key={index} className="flex justify-between items-center p-4 border rounded-md">
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 transition duration-300">
                Edit
              </button>
              <button onClick={() => handleDelete(index)} className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;