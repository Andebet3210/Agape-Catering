 import React, { useContext, useState, useEffect } from 'react';
 import { StoreContext } from '../../context/StoreContext';
 import { useNavigate } from 'react-router-dom';
 import {
   MapContainer,
   TileLayer,
   Marker,
   useMap,
   useMapEvents,
   Popup,
 } from 'react-leaflet';
 import L from 'leaflet';
 import 'leaflet/dist/leaflet.css';

 // Fix Leaflet marker issue in React
 import markerIcon from 'leaflet/dist/images/marker-icon.png';
 import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
 import markerShadow from 'leaflet/dist/images/marker-shadow.png';

 delete L.Icon.Default.prototype._getIconUrl;
 L.Icon.Default.mergeOptions({
   iconRetinaUrl: markerIcon2x,
   iconUrl: markerIcon,
   shadowUrl: markerShadow,
 });

 const AddisAbaba = [9.03, 38.74]; // Default map center

 // Map Component to Handle Location Selection
 const LocationSelector = ({ setLocation, setLocationInput, setShowMap }) => {
   const map = useMap();

   useMapEvents({
     click: async (e) => {
       const { lat, lng } = e.latlng;
       setLocation({ lat, lng });

       // Move the map to the new location
       map.flyTo([lat, lng], 16); // Zoom in to show more details

       // Reverse Geocode to get the Address
       try {
         const response = await fetch(
           `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
         );
         const data = await response.json();
         setLocationInput(
           data.display_name || `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
         );
       } catch (error) {
         setLocationInput(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
       }

       setShowMap(false); // Hide map after selection
     },
   });

   return null;
 };

 const PlaceOrder = () => {
   const { totalCartPrice } = useContext(StoreContext);
   const navigate = useNavigate();

   const [location, setLocation] = useState({ lat: null, lng: null });
   const [orderedDate, setOrderedDate] = useState('');
   const [deliveryDate, setDeliveryDate] = useState('');
   const [orderType, setOrderType] = useState('');
   const [minDeliveryDate, setMinDeliveryDate] = useState('');
   const [showMap, setShowMap] = useState(false);
   const [locationInput, setLocationInput] = useState('');
   const [upfrontPayment, setUpfrontPayment] = useState(0);
   const [remainingPayment, setRemainingPayment] = useState(0);

   // Set ordered date on mount
   useEffect(() => {
     const today = new Date();
     setOrderedDate(today.toISOString().split('T')[0]);
   }, []);

   // Adjust min delivery date and calculate payments based on order type
   useEffect(() => {
     const today = new Date();
     if (orderType === 'Scheduled') {
       const twoWeeksLater = new Date(today);
       twoWeeksLater.setDate(today.getDate() + 14);
       setMinDeliveryDate(twoWeeksLater.toISOString().split('T')[0]);

       // Calculate payments for scheduled orders
       setUpfrontPayment(totalCartPrice * 0.4); // 40% upfront
       setRemainingPayment(totalCartPrice * 0.6); // 60% remaining
     } else if (orderType === 'Urgent') {
       setMinDeliveryDate(today.toISOString().split('T')[0]);

       // Calculate payments for urgent orders
       setUpfrontPayment(totalCartPrice); // 100% upfront
       setRemainingPayment(0); // No remaining payment
     } else {
       setMinDeliveryDate('');
       setUpfrontPayment(0);
       setRemainingPayment(0);
     }
   }, [orderType, totalCartPrice]);

   // Form submission
   const handleSubmit = (e) => {
     e.preventDefault();
     if (!location.lat || !location.lng) {
       alert('Please select a delivery location.');
       return;
     }
     if (!deliveryDate) {
       alert('Please select a delivery date.');
       return;
     }
     if (!orderType) {
       alert('Please select the type of order.');
       return;
     }

     // Save order details (e.g., to a backend or state management)
     const orderDetails = {
       location,
       orderedDate,
       deliveryDate,
       orderType,
       upfrontPayment,
       remainingPayment,
       totalCartPrice,
     };
     console.log('Order Details:', orderDetails);

     // Navigate to the order confirmation page
     navigate('/order');
   };

   return (
     <div className="p-4 sm:p-8 space-y-8 bg-gray-100 rounded-lg max-w-full sm:max-w-3xl mx-auto">
       <form
         onSubmit={handleSubmit}
         className="space-y-4 bg-white p-6 rounded-lg shadow-md"
       >
         <p className="text-xl font-bold mb-4">Delivery Information</p>

         <input
           type="text"
           placeholder="Full Name"
           required
           className="border p-2 rounded-md w-full text-green-600"
         />
         <input
           type="email"
           placeholder="Email"
           required
           className="border p-2 rounded-md w-full text-green-600"
         />
         <input
           type="text"
           placeholder="Phone number"
           required
           className="border p-2 rounded-md w-full text-green-600"
         />

         {/* Ordered Date */}
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Ordered Date
           </label>
           <input
             type="text"
             value={orderedDate}
             readOnly
             className="border p-2 rounded-md w-full bg-gray-100 text-green-600"
           />
         </div>

         {/* Order Type */}
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Type of Order
           </label>
           <select
             value={orderType}
             onChange={(e) => setOrderType(e.target.value)}
             required
             className="border p-2 rounded-md w-full text-green-600"
           >
             <option value="">Select Type of Order</option>
             <option value="Urgent">Urgent</option>
             <option value="Scheduled">Scheduled</option>
           </select>
         </div>

         {/* Delivery Date */}
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Delivery Date
           </label>
           <input
             type="date"
             value={deliveryDate}
             onChange={(e) => setDeliveryDate(e.target.value)}
             min={minDeliveryDate}
             required
             className="border p-2 rounded-md w-full text-green-600"
           />
         </div>

         {/* Location Input */}
         <div>
           <label className="block text-sm font-medium text-gray-700">
             Select Delivery Location
           </label>
           <input
             type="text"
             value={locationInput}
             onClick={() => setShowMap(true)}
             readOnly
             placeholder="Click to select location"
             className="border p-2 rounded-md w-full cursor-pointer text-green-500"
           />
         </div>

         {/* Map for Selecting Location */}
         {showMap && (
           <div className="h-72 w-full mt-4">
             <MapContainer
               center={AddisAbaba}
               zoom={14} // Increased zoom level for better details
               style={{ height: '100%', width: '100%' }}
             >
               <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="&copy; OpenStreetMap contributors"
               />
               <LocationSelector
                 setLocation={setLocation}
                 setLocationInput={setLocationInput}
                 setShowMap={setShowMap}
               />
               {location.lat && (
                 <Marker position={[location.lat, location.lng]}>
                   <Popup>Delivery Location</Popup>
                 </Marker>
               )}
             </MapContainer>
           </div>
         )}

         {/* Payment Section */}
         <div className="space-y-2  ">
           <p className="text-lg   text-red-400 font-serif font-bold">
             Payment Details
           </p>
           <hr />
           <div className="flex justify-between">
             <span className="font-semibold text-purple-600">
               Total Cart Price:
             </span>
             <span className="font-medium text-green-600">
               {totalCartPrice.toFixed(2)} ETB
             </span>
           </div>

           {/* Upfront Payment */}
           <div className="flex justify-between">
             <span className="font-semibold text-purple-600">
               Upfront Payment ({orderType === 'Scheduled' ? '40%' : '100%'}):
             </span>
             <span className="font-medium text-green-600">
               {upfrontPayment.toFixed(2)} ETB
             </span>
           </div>

           {/* Remaining Payment (for Scheduled Orders) */}
           {orderType === 'Scheduled' && (
             <div className="flex justify-between">
               <span className="font-semibold text-purple-600">
                 Remaining Payment (60%):
               </span>
               <span className="font-medium text-green-600">
                 {remainingPayment.toFixed(2)} ETB
               </span>
             </div>
           )}
         </div>

         <button
           type="submit"
           className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
         >
           Confirm Order
         </button>
       </form>
     </div>
   );
 };

 export default PlaceOrder;