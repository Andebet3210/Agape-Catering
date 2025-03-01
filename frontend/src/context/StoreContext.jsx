 import { createContext, useEffect, useState } from 'react';
 import axios from 'axios';

 export const StoreContext = createContext(null);

 const StoreContextProvider = (props) => {
   // State variables
   const [cartItems, setCartItems] = useState(() => {
     return JSON.parse(localStorage.getItem('cartItems')) || {};
   });
   const [food_list, setFoodList] = useState([]);
   const [token, setToken] = useState('');
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [darkMode, setDarkMode] = useState(() => {
     return localStorage.getItem('theme') === 'dark';
   });
   const [userRole, setUserRole] = useState(() => {
     return localStorage.getItem('userRole') || '';
   });
   const [feedbackList, setFeedbackList] = useState([]); // Feedback state

   const url = 'http://localhost:4000';

   // Fetch food list
   const fetchFoodList = async () => {
     try {
       const response = await axios.get(`${url}/api/food/list`);
       setFoodList(Array.isArray(response.data.data) ? response.data.data : []);
     } catch (error) {
       console.error('Error fetching food list:', error);
     }
   };

   // Fetch feedback list
   const fetchFeedbackList = async () => {
     try {
       const response = await axios.get(`${url}/api/feedback/list`, {
         headers: { token },
       });
       console.log('Fetched Feedback:', response.data); // Debug response
       setFeedbackList(
         Array.isArray(response.data.data) ? response.data.data : []
       );
     } catch (error) {
       console.error('Error fetching feedback list:', error);
     }
   };

   // Add feedback
   const addFeedback = async (feedback) => {
     try {
       const response = await axios.post(`${url}/api/feedback/add`, feedback, {
         headers: { token },
       });

       if (response.data.success) {
         console.log('Feedback added successfully:', response.data);
         await fetchFeedbackList(); // Refetch updated feedback list
       }
     } catch (error) {
       console.error('Error adding feedback:', error);
     }
   };

   // Fetch food list and feedback on component mount or when user logs in
   useEffect(() => {
     fetchFoodList();
     if (isLoggedIn) {
       fetchFeedbackList();
     }
   }, [isLoggedIn]);

   // Save cart items to localStorage
   useEffect(() => {
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
   }, [cartItems]);

   // Check for saved token and user role on component mount
   useEffect(() => {
     const savedToken = localStorage.getItem('token');
     const savedRole = localStorage.getItem('userRole');
     if (savedToken) {
       setToken(savedToken);
       setIsLoggedIn(true);
     }
     if (savedRole) {
       setUserRole(savedRole);
     }
   }, []);

   // Handle dark mode on initial load
   useEffect(() => {
     if (darkMode) {
       document.documentElement.classList.add('dark');
     } else {
       document.documentElement.classList.remove('dark');
     }
     localStorage.setItem('theme', darkMode ? 'dark' : 'light');
   }, [darkMode]);

   // Toggle dark mode
   const toggleDarkMode = () => setDarkMode((prev) => !prev);

   // Add item to cart
   const addToCart = async (itemId, quantity = 1) => {
     if (!isLoggedIn) {
       alert('Please log in to add items to your cart.');
       return;
     }

     // Update local cart state
     setCartItems((prev) => ({
       ...prev,
       [itemId]: (prev[itemId] || 0) + quantity,
     }));

     // Send request to backend to update the cart in the database
     if (token) {
       try {
         await axios.post(
           `${url}/api/cart/add`,
           { itemId, quantity },
           { headers: { token } }
         );
       } catch (error) {
         console.error('Error adding item to cart:', error);
       }
     }
   };

   // Remove item from cart
   const removeFromCart = async (itemId, removeAll = false) => {
     if (!cartItems[itemId]) return; // Ensure item exists in cart

     // Update local cart state
     setCartItems((prev) => {
       const updatedCart = { ...prev };

       if (removeAll) {
         // Completely remove the item
         delete updatedCart[itemId];
       } else {
         // Decrease quantity or remove if 1
         if (updatedCart[itemId] > 1) {
           updatedCart[itemId] -= 1;
         } else {
           delete updatedCart[itemId];
         }
       }

       return updatedCart;
     });

     // Send request to backend to update the cart in the database
     if (token) {
       try {
         await axios.post(
           `${url}/api/cart/remove`,
           { itemId, removeAll },
           { headers: { token } }
         );
       } catch (error) {
         console.error('Error removing item from cart:', error);
       }
     }
   };

   // Calculate total cart price
   const totalCartPrice = food_list.reduce(
     (total, item) => total + item.price * (cartItems[item._id] || 0),
     0
   );

   // Context value
   const contextValue = {
     food_list,
     fetchFoodList,
     cartItems,
     addToCart,
     removeFromCart,
     isLoggedIn,
     setIsLoggedIn,
     totalCartPrice,
     url,
     token,
     setToken,
     darkMode,
     toggleDarkMode,
     userRole,
     setUserRole,
     feedbackList, // Feedback state and functions
     addFeedback,
     fetchFeedbackList,
   };

   return (
     <StoreContext.Provider value={contextValue}>
       {props.children}
     </StoreContext.Provider>
   );
 };

 export default StoreContextProvider;