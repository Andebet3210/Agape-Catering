import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { Link } from "react-router-dom";

const ListStaff = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axiosInstance.get("/staff/list-staff");
      setStaff(response.data.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axiosInstance.delete(`/staff/${id}`);
      fetchStaff(); // Refresh the list
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Staff List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((staffMember) => (
          <div key={staffMember._id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{staffMember.firstName} {staffMember.lastName}</h3>
            <p>Email: {staffMember.email}</p>
            <p>Role: {staffMember.role}</p>
            <div className="mt-4">
              <Link
                to={`/staff/edit/${staffMember._id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteStaff(staffMember._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListStaff;
