 import React, { useContext, useEffect } from 'react';
 import { StoreContext } from '../../context/StoreContext';
 import { RiCloseLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

 const Cart = () => {
   const { cartItems, food_list, addToCart, removeFromCart, decreaseQuantity,url } =
     useContext(StoreContext);
     const navigate = useNavigate();

   // Debugging: Log cartItems and food_list
   useEffect(() => {
     console.log('Food List:', food_list);
     console.log('Cart Items:', cartItems);
   }, [cartItems, food_list]);

   // Filter items based on cartItems
   const filteredItems = food_list.filter((item) => cartItems[item._id] > 0);

   // Debugging: Log filteredItems
   useEffect(() => {
     console.log('Filtered Items:', filteredItems);
   }, [filteredItems]);

   // Calculate total cart price
   const totalCartPrice = filteredItems.reduce(
     (total, item) => total + item.price * (cartItems[item._id] || 0),
     0
   );

   return (
     <div className="p-4 sm:p-8 pt-16">
       {/* Cart Header */}
       <div className="hidden sm:grid grid-cols-6 font-bold border-b border-gray-200 py-8">
         <div>Item</div>
         <div>Title</div>
         <div>Price</div>
         <div>Quantity</div>
         <div>Total</div>
         <div>Remove</div>
       </div>
       <hr className="hidden sm:block" />

       {/* Cart Items */}
       {filteredItems.map((item) => (
         <div
           key={item._id}
           className="grid grid-cols-3 sm:grid-cols-6 items-center border-b border-gray-200 py-4 gap-4"
         >
           <img
             src={url+"/uploads/"+item.image}
             alt={item.name}
             className="w-16 h-16 sm:w-10 sm:h-10 rounded-full"
           />
           <p className="col-span-2 sm:col-span-1">{item.name}</p>
           <p className="hidden sm:block">{item.price} ETB</p>
           {/* Quantity Controls */}
           <div className="flex items-center space-x-2">
             <button
               onClick={() => decreaseQuantity(item._id)}
               className="bg-red-500 text-white px-2 py-1 rounded-md"
             >
               -
             </button>
             <p>{cartItems[item._id] || 0}</p>
             <button
               onClick={() => addToCart(item._id)}
               className="bg-green-500 text-white px-2 py-1 rounded-md"
             >
               +
             </button>
           </div>
           <p className="hidden sm:block">
             {item.price * (cartItems[item._id] || 0)} ETB
           </p>
           <button
             onClick={() => removeFromCart(item._id,true)}
             className="text-red-600 cursor-pointer"
             title="Remove Item"
           >
             <RiCloseLine size={20} />
           </button>
         </div>
       ))}

       {/* Empty Cart Message */}
       {filteredItems.length === 0 && (
         <p className="text-gray-600 text-center mt-4">Your cart is empty.</p>
       )}

       {/* Total Cart Price and Checkout Button */}
       {filteredItems.length > 0 && (
         <div className="mt-8">
           <div className="flex justify-between items-center border-t border-gray-200 pt-4"></div>
         </div>
       )}

       {/* Cart Total and Checkout */}
       <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg max-w-full sm:max-w-md mt-8">
         <h2 className="text-2xl font-bold mb-4">Cart Total</h2>
          
         <div className="flex justify-between items-center mb-4 border-t border-gray-400 pt-2">
           <b className="text-xl font-bold text-gray-800">Total</b>
           <b className="text-xl font-bold text-green-600">
             {totalCartPrice} ETB
           </b>
         </div>
         <button onClick={()=>navigate('/order')} className="w-full bg-red-400 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
           Proceed to Checkout
         </button>
       </div>
     </div>
   );
 };

 export default Cart;
