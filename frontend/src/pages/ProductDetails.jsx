// React hooks
import React, { useEffect, useState } from "react";

// React Router hooks and components
import { useParams, useNavigate, Link } from "react-router-dom";

// Cart context
import { useCart } from "../context/CartContext";

function ProductDetail() {
  // Get product ID from URL
  const { id } = useParams();

  // Navigation hook
  const navigate = useNavigate();

  // Cart function from context
  const { addToCart } = useCart();

  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend URL
  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL ||
    "http://127.0.0.1:8000";

  useEffect(() => {
    // Fetch product details using product ID
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load product details.");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product Fetch Error:", err);

        setError(err.message);
        setLoading(false);
      });
  }, [id, BASEURL]); // Added BASEURL dependency

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product details...
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  // Generate image URL
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASEURL}${product.image}`
    : "https://via.placeholder.com/800";

    const handleAddToCart = () => {
  if (!localStorage.getItem("access_token")) {
    window.location.href = "/login";
    return;
  }

  addToCart(product);
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center gap-4">

          {/* Home Link */}
          <Link
            to="/"
            className="text-gray-700 hover:text-pink-500 font-medium"
          >
            Home
          </Link>
        </div>
      </header>

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto p-8 grid lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white rounded-2xl shadow p-4">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full max-h-[80vh] object-contain rounded-xl"
          />
        </div>

        {/* Product Information */}
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col justify-between">
          <div>
            {/* Category */}
            {product.category?.name && (
              <span className="text-pink-500 font-semibold uppercase text-sm">
                {product.category.name}
              </span>
            )}

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              {product.name}
            </h1>

            {/* Product Price */}
            <p className="text-2xl font-semibold text-green-600 mb-6">
              ₹{product.price}
            </p>

            {/* Description */}
            <h3 className="text-lg font-semibold mb-2">
              Description
            </h3>

            <p className="text-gray-600 whitespace-pre-line">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {/* Add To Cart */}
            <button
  onClick={handleAddToCart}
  className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
>
  Add to Cart 🛒
</button>

            {/* Buy Now */}
            <button
  onClick={() => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/login";
      return;
    }

    addToCart(product);
    navigate("/checkout");
  }}
  className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
>
  Buy Now
</button>
          </div>

          {/* Continue Shopping Link */}
          <div className="mt-6">
            <Link
  to="/"
  className="text-pink-500 font-medium hover:text-pink-600 hover:underline"
>
  ← Continue Shopping
</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;