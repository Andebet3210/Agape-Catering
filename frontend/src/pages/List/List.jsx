import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RiCloseLine } from 'react-icons/ri';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching food list');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch food list');
    }
  };

  const handleRemoveFood = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        setList((prevList) => prevList.filter((item) => item._id !== id));
        toast.success('Food removed successfully');
      } else {
        toast.error('Error removing food');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error removing food');
    }
  };

  const handleEditFood = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: null, // Ensure image is reset in the form
    });
    setIsModalOpen(true); // Open the modal when "Update" is clicked
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.put(
        `${url}/api/food/update/${selectedItem._id}`,
        formDataToSend
      );

      if (response.data.success) {
        toast.success('Food updated successfully');

        // Update the list state with the updated data
        setList((prevList) =>
          prevList.map((item) =>
            item._id === selectedItem._id
              ? { ...item, ...formData, image: response.data.data.image } // Use updated image
              : item
          )
        );

        setIsModalOpen(false); // Close the modal after saving
        setFormData({
          name: '',
          category: '',
          price: '',
          description: '',
          image: null,
        }); // Reset form data
      } else {
        toast.error('Error updating food');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating food');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="px-2 py-2 ml-64 pt-16">
      <h1 className="text-2xl  font-bold text-red-400 mb-4 text-center">
        Food List
      </h1>
      <hr className="mb-4" />

      {/* Modal Popup for Update Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)} // Close the modal when clicked
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <RiCloseLine size={24} className="text-red-600 font-bold" />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4 text-red-400">
              Update Food Item
            </h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-2 text-blue-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2 text-blue-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Appetizer">Vegetable</option>
                  <option value="Main Course">Full Package</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                  <option value="የጾም">የጾም</option>
                  <option value="የፍስክ">የፍስክ</option>
                  <option value="Global Cuisine">Global Cuisine</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2 text-blue-700">
                  Price (ETB)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2 text-blue-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2 text-blue-700">
                  Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-400 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Table Container */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-green-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-green-700 text-sm md:text-xl">
                Image
              </th>
              <th className="px-4 py-2 text-left font-bold text-green-700 text-sm md:text-xl">
                Name
              </th>
              <th className="px-4 py-2 text-left font-bold text-green-700 text-sm md:text-xl">
                Category
              </th>
              <th className="px-4 py-2 text-left font-bold text-green-700 text-sm md:text-xl">
                Price
              </th>
              <th className="px-4 py-2 text-left font-bold text-green-700 text-sm md:text-xl">
                Action
              </th>
              <th className="px-4 py-2 text-left font-bold text-green-700 text-sm md:text-xl">
                Remove
              </th>
            </tr>
          </thead>

          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={`${url}/uploads/${
                      item.image
                    }?t=${new Date().getTime()}`} // Cache-busting query
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 py-2 text-sm md:text-base">{item.name}</td>
                <td className="px-4 py-2 text-sm md:text-base">
                  {item.category}
                </td>
                <td className="px-4 py-2 text-sm md:text-base">
                  {item.price} ETB
                </td>

                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditFood(item)}
                    className="bg-yellow-600 text-white px-4 py-2 font-semibold rounded-full"
                  >
                    Update
                  </button>
                </td>

                <td className="px-4 py-2">
                  <button
                    onClick={() => handleRemoveFood(item._id)}
                    className=" text-red-600 "
                  >
                    <RiCloseLine size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
