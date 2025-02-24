import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cartItems')) || {};
  });

  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const url = 'http://localhost:4000';

  // Fetch Food List
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  // Save Cart to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Cart Operations
  const addToCart = async (itemId) => {
    if (!isLoggedIn) {
      alert('Please log in to add items to your cart.');
      return;
    }
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: +1,
      }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + '/api/cart/add',
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
    if (token) {
      await axios.post(
        url + '/api/cart/remove',
        { itemId },
        { headers: { token } }
      );
    }
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId] || prev[itemId] <= 1) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
      return {
        ...prev,
        [itemId]: prev[itemId] - 1,
      };
    });
  };

  const totalCartPrice = food_list.reduce(
    (total, item) => total + item.price * (cartItems[item._id] || 0),
    0
  );

  const contextValue = {
    food_list,
    fetchFoodList,
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    isLoggedIn,
    setIsLoggedIn,
    totalCartPrice,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
