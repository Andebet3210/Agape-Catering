import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { RiCloseLine } from 'react-icons/ri';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Define subcategories for each category
  const subcategories = {
    Drinks: ['Soft Drinks', 'Alcoholic Drinks', 'Juices', 'Water'],
    Dessert: ['Cake', 'Ice Cream', 'Cookies', 'Pastries'],
    'Global cuisine': ['Pizza', 'Burger', 'Pasta', 'Sushi'],
    Vegetable: ['Salads', 'Grilled Vegetables', 'Vegetable Stir Fry'],
    'Full Package': ['Starter', 'Main Course', 'Dessert', 'Drinks'],
    የጾም: ['በያይነት', 'ማህበራዊ'],
    የፍስክ: ['ዶሮ', 'ጥብስ', 'ስጋ ፍርፍር'],
  };

  // Group food items by subcategory
  const groupedFoodList = food_list.reduce((acc, item) => {
    if (item.category === category) {
      if (!acc[item.subcategory]) {
        acc[item.subcategory] = [];
      }
      acc[item.subcategory].push(item);
    }
    return acc;
  }, {});

  // Open modal with selected food item
  const openModal = (food) => {
    setSelectedFood(food);
    setQuantity(1);
  };

  // Close modal
  const closeModal = () => {
    setSelectedFood(null);
    setQuantity(1);
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedFood) return;
    addToCart(selectedFood._id, quantity);
    closeModal();
  };

  return (
    <div className="pt-12">
      {/* Category Header */}
      <h2 className="text-xl sm:text-2xl font-bold font-serif p-2 sm:p-4">
        {category} Menu
      </h2>

      {/* Display Subcategories and Food Items */}
      {subcategories[category]?.map((subcategory) => (
        <div key={subcategory} className="mb-8">
          {/* Subcategory Title */}
          <h3 className="text-lg font-bold uppercase mb-2">{subcategory}</h3>
          {/* Horizontal Line */}
          <hr className="border-t-2 border-gray-300 mb-4" />

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {groupedFoodList[subcategory]?.map((item) => (
              <div
                key={item._id}
                className="cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => openModal(item)} // Open modal on click
              >
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal for Food Item */}
      {selectedFood && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <RiCloseLine size={24} className="text-red-600 font-bold" />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4 text-red-400">
              {selectedFood.name}
            </h2>
            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{selectedFood.description}</p>
            <p className="text-lg font-bold text-gray-800 mb-2">
              Price: {selectedFood.price} ETB
            </p>

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block font-semibold mb-2 text-blue-700">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-red-400 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
