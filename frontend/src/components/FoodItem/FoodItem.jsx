import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';

const FoodItem = ({ id, name, price, description, image }) => {
  const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
      <div>
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-lg"
        />

        {!cartItems[id] ? (
          <img
            className="bg-blue-600 rounded-full p-1 w-6 h-6 cursor-pointer mt-2"
            onClick={() => addToCart(id)}
            src={assets.add_icon}
            alt="Add Item"
          />
        ) : (
          <div className="flex items-center space-x-2 mt-2">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.minus_icon}
              alt=""
              className="bg-red-600 rounded-full p-1 w-6 h-6 cursor-pointer mt-2"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon}
              alt=""
              className="bg-green-600 rounded-full p-1 w-6 h-6 cursor-pointer mt-2"
            />
          </div>
        )}
      </div>

      <div>
        <div>
          <p className="text-xl font-semibold mt-2">{name}</p>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-lg font-bold text-green-600 mt-2">{price} ETB</p>
      </div>
    </div>
  );
};

export default FoodItem;
