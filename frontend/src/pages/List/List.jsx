 import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 import { toast } from 'react-toastify';
 import { RiCloseLine } from 'react-icons/ri';

 const List = ({url}) => {
    const [list, setList] = useState([]);

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
         toast.success('Food removed successfully', {
           position: 'top-right',
           autoClose: 3000,
           style: {
             backgroundColor: '#FFFFFF', // White background
             color: '#FF0000', // Red text
             border: '1px solid #FF0000', // Red border
           },
         });
       } else {
         toast.error('Error removing food');
       }
     } catch (error) {
       console.error(error);
       toast.error('Error removing food');
     }
   };

   const handleEditFood = (item) => {
     console.log('Edit food:', item);
   };

   useEffect(() => {
     fetchList();
   }, []);

   return (
     <div className="px-2 py-2">
       <h1 className="text-4xl font-bold text-red-400 mb-4 text-center">
         Food List
       </h1>
       <hr className="mb-4" />

       {/* Responsive Table Container */}
       <div className="overflow-x-auto shadow-md rounded-lg">
         <table className="w-full table-auto border-collapse">
           <thead className="bg-green-100">
             <tr>
               <th className="px-4 py-2 text-left font-bold text-green-700 text-xl">
                 Image
               </th>
               <th className="px-4 py-2 text-left font-bold text-green-700 text-xl">
                 Name
               </th>
               <th className="px-4 py-2 text-left font-bold text-green-700 text-xl">
                 Category
               </th>
               <th className="px-4 py-2 text-left font-bold text-green-700 text-xl">
                 Price
               </th>
               <th className="px-4 py-2 text-left font-bold text-green-700 text-xl">
                 Action
               </th>
               <th className="px-4 py-2 text-left font-bold text-green-700 text-xl">
                 Remove
               </th>
             </tr>
           </thead>

           <tbody>
             {list.map((item, index) => (
               <tr key={index} className="border-b hover:bg-gray-50">
                 <td className="px-4 py-2">
                   <img
                     src={`${url}/uploads/${item.image}`}
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
                     className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-700 text-sm md:text-base"
                   >
                     Update
                   </button>
                 </td>

                 <td className="px-4 py-2">
                   <button
                     onClick={() => handleRemoveFood(item._id)}
                     className="text-red-600 hover:text-red-900 focus:outline-none"
                   >
                     <RiCloseLine size={24} />
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
