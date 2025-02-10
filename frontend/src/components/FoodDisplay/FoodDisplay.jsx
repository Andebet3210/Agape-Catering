import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="pt-12">
      <h2 className="text-xl sm:text-2xl font-bold font-serif p-2 sm:p-4">
        Top dishes near you
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {
            return (
              <div
                key={index}
                className="cursor-pointer transition-transform transform hover:scale-105"
              >
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
