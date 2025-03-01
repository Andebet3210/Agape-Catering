import React, { useState, useContext } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../context/StoreContext';

const Add = ({ url }) => {
  const { fetchFoodList } = useContext(StoreContext);

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form fields after success
        setData({
          name: '',
          description: '',
          price: '',
          category: '',
        });
        setImage(null);

        // Refresh food list
        fetchFoodList();
      } else {
        toast.error(response.data.message || 'Failed to add food.');
      }
    } catch (error) {
      console.error(
        'Error adding food:',
        error.response?.data || error.message
      );
      toast.error('Failed to add food. Please try again.');
    }
  };

  return (
    <div className="flex justify-start items-center min-h-screen bg-gray-50 ml-64 p-6">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl space-y-6"
      >
        {/* Upload Image */}
        <div className="flex flex-col space-y-2">
          <span className="text-gray-700 text-lg">Upload Image</span>
          <label htmlFor="image" className="cursor-pointer">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
            ) : (
              <FaCloudUploadAlt className="border-2 border-gray-300 w-20 h-20 text-gray-400 hover:text-gray-500 transition duration-300" />
            )}
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type the name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="4"
            placeholder="Write the description"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Dessert">Dessert</option>
              <option value="Drinks">Drinks</option>
              <option value="Global cuisine">Global cuisine</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Full Package">Full Package</option>
              <option value="የጾም">የጾም</option>
              <option value="የፍስክ">የፍስክ</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="ETB"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
              min="1"
              step="0.01"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gray-950 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
