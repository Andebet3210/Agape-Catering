import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState('Login');

  const iconShown = () => {
    setShowLogin(false);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <form>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-green-600">
            {currentState === 'Login' ? 'Login' : 'Sign Up'}
          </h2>
          <p onClick={iconShown} className="cursor-pointer text-red-500">
            <FaTimes size={20} />
          </p>
        </div>

        <div className="space-y-4">
          {currentState === 'Sign Up' && (
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-400 text-white font-semibold py-2 rounded-full hover:bg-gray-600 transition duration-300 mt-4"
        >
          {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <div className="flex items-center mt-4">
          <input type="checkbox" required className="mr-2" />
          <p className="text-sm text-gray-600">
            agree to the terms of use & policy.
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          {currentState === 'Login' ? (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setCurrentState('Sign Up')}
                className="text-blue-500 font-medium cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setCurrentState('Login')}
                className="text-blue-500 font-medium cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
