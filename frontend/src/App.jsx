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
 import StoreContext from './context/StoreContext';

 // Manager Imports
 import ManagerSidebar from './manager/managerSidebar/managerSidebar';
 import ManagerNavbar from './manager/managerNavbar/Navbar';
 import Add from './pages/Add/Add';
 import List from './pages/List/List';
 import Orders from './pages/Orders/Orders';
// import Header from './components/Header/Header';

 const AppContent = () => {
  const url = "http://localhost:4000"
   const [showLogin, setShowLogin] = useState(false);
   const location = useLocation();
   const isManagerRoute = location.pathname.startsWith('/manager');

   return (
     <>
       <div>
         <ToastContainer />
         {isManagerRoute ? (
           <ManagerNavbar />
         ) : (
           <Navbar setShowLogin={setShowLogin} />
         )}

         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/cart" element={<Cart />} />
           <Route
             path="/menu"
             element={
               <FoodDisplay setShowLogin={setShowLogin} category="All" />
             }
           />
           <Route path="/category" element={<Explore />} />
           <Route path="/feedback" element={<FeedbackForm />} />
           <Route path="/contact" element={<Footer />} />
           <Route path="/order" element={<PlaceOrder />} />

           {/* <Route path="/manager" element={<ManagerSidebar />}>
             <Route path="header" index element={<Header />} />
             <Route path="add" element={<Add />} />
             <Route path="list" element={<List />} />
             <Route path="orders" element={<Orders />} />
           </Route> */}

           <Route path="/manager" element={<ManagerSidebar />}>
             {/* Always show Header for all /manager routes */}
             {/* <Route index element={<Header />} /> */}
             <Route path="add" element={<Add url={url} />} />
             <Route path="list" element={<List url={url} />} />
             <Route path="orders" element={<Orders url={url} />} />
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
     <StoreContext>
       <AppContent />
     </StoreContext>
   );
 };

 export default App;
