import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import FoodDisplay from './components/FoodDisplay/FoodDisplay';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Explore from './components/Explore/Explore';
import FeedbackForm from './pages/Feedback/Feedback';
 
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<FoodDisplay setShowLogin={setShowLogin} category="All" />} />
          <Route path="/category" element={<Explore />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/contact" element={<Footer />} />
        </Routes>
        <Footer />
      </div>

       {showLogin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-md max-w-md w-full relative transform scale-100 opacity-100 transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <Login setShowLogin={setShowLogin} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
