import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const PlaceOrder = () => {
  const { totalCartPrice } = useContext(StoreContext);
  const navigate = useNavigate();

  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  const [orderedDate, setOrderedDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [orderType, setOrderType] = useState(''); // State for order type
  const [minDeliveryDate, setMinDeliveryDate] = useState(''); // State for minimum delivery date

  // Automatically set the ordered date when the component mounts
  useEffect(() => {
    const today = new Date();
    setOrderedDate(today.toISOString().split('T')[0]); // Format: YYYY-MM-DD
  }, []);

  // Update minimum delivery date based on order type
  useEffect(() => {
    if (orderType === 'Scheduled') {
      const today = new Date();
      const twoWeeksLater = new Date(today);
      twoWeeksLater.setDate(today.getDate() + 14); // Add 14 days
      setMinDeliveryDate(twoWeeksLater.toISOString().split('T')[0]);
    } else if (orderType === 'Urgent') {
      const today = new Date();
      setMinDeliveryDate(today.toISOString().split('T')[0]); // Same day
    } else {
      setMinDeliveryDate(''); // Reset if no order type is selected
    }
  }, [orderType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.lat || !location.lng) {
      alert('Please select a location to proceed.');
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
    navigate('/order');
  };

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-gray-100 rounded-lg max-w-full sm:max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <p className="text-xl font-bold mb-4">Delivery Information</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="border p-2 rounded-md w-full"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Phone number"
            required
            className="border p-2 rounded-md w-full"
          />

          {/* Ordered Date (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ordered Date
            </label>
            <input
              type="text"
              value={orderedDate}
              readOnly
              className="border p-2 rounded-md w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type of Order
            </label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              required
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Type of Order</option>
              <option value="Urgent">Urgent</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>

          {/* Delivery Date (Calendar Picker) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Date
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={minDeliveryDate} // Set minimum date based on order type
              required
              className="border p-2 rounded-md w-full"
            />
          </div>

          {/* Type of Order (Dropdown Menu) */}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
        >
          Confirm Order
        </button>
      </form>

      {/* Google Map */}
      <div className="h-64 w-full">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={{ lat: -34.397, lng: 150.644 }} // Default center
            zoom={10}
            onClick={handleMapClick}
          >
            {location.lat && location.lng && (
              <Marker position={{ lat: location.lat, lng: location.lng }} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default PlaceOrder;