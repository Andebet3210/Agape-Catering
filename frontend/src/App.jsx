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
//system admin panel
import CreateAccount from './SystemAdmin/CreateAccount/createaccount';
import SystemSettings from './SystemAdmin/SystemSetting';
import UserManagement from './SystemAdmin/UserManagement';
import SystemSidebar from './SystemAdmin/SystemSidebar';
import SystemNavbar from './SystemAdmin/SystemNavbar';
import ViewUser from './SystemAdmin/ViewUser';
import EditStaff from './SystemAdmin/EditStaff';
import ListStaff from './SystemAdmin/ListStaff';

const AppContent = () => {
  const url = 'http://localhost:4000';
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isManagerRoute = location.pathname.startsWith('/manager');
  const isSystemRoute = location.pathname.startsWith('/system');

  return (
    <>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ToastContainer />
        {isManagerRoute ? (
          <ManagerNavbar />
        ) : isSystemRoute ? (
          <SystemNavbar />
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

          {/* System Admin Routes with Sidebar */}
          <Route path="/system" element={<SystemSidebar />}>
            <Route index element={<SystemSettings url={url} />} />
            <Route path="createaccount" element={<CreateAccount url={url} />} />
            <Route path="edituser" element={<EditStaff url={url} />} />
            <Route path="settings" element={<SystemSettings url={url} />} />
            <Route path="user-management" element={<UserManagement url={url} />} />
            <Route path="list" element={<ListStaff url={url} />} />
            <Route path="viewuser" element={<ViewUser url={url} />} />
          </Route>
        </Routes>

        {!isManagerRoute && !isSystemRoute && <Footer />}
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
