import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Customer Imports
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import FoodDisplay from './components/FoodDisplay/FoodDisplay';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Explore from './components/Explore/Explore';
import FeedbackForm from './pages/Feedback/Feedback';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import StoreContextProvider from './context/StoreContext'; // Use StoreContextProvider

// Manager Imports
import ManagerSidebar from './manager/managerSidebar/managerSidebar';
import ManagerNavbar from './manager/managerNavbar/Navbar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import ManagerHome from './manager/ManagerHome/Home';
import Profile from './manager/Profile';
import ViewFeedback from './manager/viewFeedback';

const AppContent = () => {
  const url = 'http://localhost:4000';
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isManagerRoute = location.pathname.startsWith('/manager');

  return (
    <>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ToastContainer />
        {isManagerRoute ? (
          <ManagerNavbar />
        ) : (
          <Navbar setShowLogin={setShowLogin} />
        )}

        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/menu"
            element={<FoodDisplay setShowLogin={setShowLogin} category="All" />}
          />
          <Route path="/category" element={<Explore />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/view-feedback" element={<ViewFeedback />} />
          <Route path="/contact" element={<Footer />} />
          <Route path="/order" element={<PlaceOrder />} />
          {/* Manager Routes with Sidebar */}
          <Route path="/manager" element={<ManagerSidebar />}>
            <Route index element={<ManagerHome />} />
            <Route path="add" element={<Add url={url} />} />
            <Route path="list" element={<List url={url} />} />
            <Route path="orders" element={<Orders url={url} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-stock" element={<div>Manage Stock Page</div>} />
            <Route
              path="generate-report"
              element={<div>Generate Report Page</div>}
            />
            <Route path="feedback" element={<div>Feedback Page</div>} />
          </Route>
        </Routes>

        {!isManagerRoute && <Footer />}
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

const App = () => {
  return (
    <StoreContextProvider>
      {' '}
      {/* Use the context provider here */}
      <AppContent />
    </StoreContextProvider>
  );
};

export default App;
