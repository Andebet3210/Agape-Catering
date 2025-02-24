 import React, { useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Close icon
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, isLoggedIn } = useContext(StoreContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(cartItems[id] || 1); // Initialize quantity

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('Please log in to add items to your cart.');
      return;
    }
    if (quantity <= 0) {
      alert('Please enter a valid quantity greater than 0.');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(id);
    }
    toggleModal();
  };

  // Handle Quantity Change
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(isNaN(newQuantity) || newQuantity < 1 ? 0 : newQuantity);
  };

  // Fix image URL
  const imageUrl = image.startsWith('http')
    ? image
    : `http://localhost:4000/uploads/${image}`;

  return (
    <>
      {/* Main Food Item Display */}
      <div
        className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer"
        onClick={toggleModal}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover rounded-lg"
        />
        <p className="text-xl font-semibold mt-2">{name}</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-lg font-bold text-green-600 mt-2">{price} ETB</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleModal}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-lg p-6 shadow-2xl z-10 w-11/12 max-w-md relative transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 p-2 transition"
            >
              <FaTimes className="w-6 h-6 bg-red-500 rounded-full p-1 text-white" />
            </button>

            {/* Food Image */}
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-60 object-cover rounded-lg"
            />

            {/* Food Details */}
 
            <h2 className="text-2xl font-bold mt-4">{name}</h2>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
            <p className="text-lg font-bold text-green-600 mt-2">{price} ETB</p>

            {/* Quantity Input & Add to Cart */}
            <div className="flex flex-col items-center justify-center mt-4 space-y-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="quantity" className="font-bold">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="border rounded-md px-2 py-1 w-20 text-center"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-red-400 rounded-full px-6 py-2 flex items-center justify-center cursor-pointer"
              >
                <span className="text-white font-semibold">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItem;
