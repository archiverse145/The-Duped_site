// React
import React from "react";

// React Router
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  // Navigation hook
  const navigate = useNavigate();

  // Django backend URL from .env
  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL ||
    "http://127.0.0.1:8000";

  // Generate product image URL
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASEURL}${product.image}`
    : "https://via.placeholder.com/300";

  // Navigate to product details page
  const handleViewProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-4 flex flex-col justify-between">
      {/* Product Card Content */}
      <Link
        to={`/product/${product.id}`}
        className="block cursor-pointer"
      >
        <div>
          {/* Product Image */}
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-xl mb-4"
          />

          {/* Product Name */}
          <h2 className="text-lg font-semibold mb-2 text-gray-800 h-16 overflow-hidden">
            {product.name}
          </h2>

          {/* Product Price */}
          <p className="text-green-600 mb-4 font-bold text-lg">
            ₹{product.price}
          </p>
        </div>
      </Link>

      {/* View Product Button */}
      <button
        onClick={handleViewProduct}
        className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition font-medium mt-2"
      >
        View
      </button>
    </div>
  );
}

export default ProductCard;