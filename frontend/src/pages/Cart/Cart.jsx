import React from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  return (
    <div className="p-8">
      <div className="">
        <div className="grid grid-cols-6 items-center justify-between  border-b border-gray-200 py-2 mt-10">
          <div className=" font-bold ">Items</div>
          <div className=" font-bold ">Title</div>
          <div className=" font-bold ">Price</div>
          <div className=" font-bold ">Quantity</div>
          <div className=" font-bold ">Total</div>
          <div className=" font-bold ">Remove</div>
        </div>
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="grid grid-cols-6 items-center justify-between  border-b border-gray-200 py-2 ">
                <p>
                  {' '}
                  <img
                    src={item.image}
                    alt=""
                    className=" rounded-full w-10 h-10"
                  />
                </p>

                <p className="">{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>
                <p className="text-red-600 ">
                  <RiCloseLine size={20} />
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Cart;
