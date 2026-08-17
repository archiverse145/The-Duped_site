import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { clearTokens, getAccessToken } from "../utils/auth.js";

function Navbar({ searchQuery, setSearchQuery }) {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-gray-800"
      >
        The Duped_site
      </Link>

      {/* Search Bar */}
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-800 hover:text-pink-500 font-medium"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="text-gray-800 hover:text-pink-500 font-medium"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-800 hover:text-pink-500 font-medium"
          >
            Logout
          </button>
        )}

        <Link
          to="/cart"
          className="relative text-gray-800 hover:text-pink-500 font-medium"
        >
          🛒 Cart

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full px-2 py-1">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;