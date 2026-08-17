// React
import React from "react";

// Cart Context
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
function CartPage() {
  // Get cart data and functions from context
  const {
    cartItems,
    total,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // Backend URL
  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL ||
    "http://127.0.0.1:8000";

  // Debug cart data in browser console
  console.log("Cart Items:", cartItems);

  return (
    <div className="pt-20 min-h-screen bg-gray-100 p-8">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛒 Your Cart
      </h1>

      {/* Empty Cart Message */}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">
          Your cart is empty.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              {/* Product Details */}
              <div className="flex items-center gap-4">
                {/* Product Image */}
                {item.product_image && (
                  <img
                    src={
                      item.product_image.startsWith("http")
                        ? item.product_image
                        : `${BASEURL}${item.product_image}`
                    }
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}

                {/* Product Info */}
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.product_name}
                  </h2>

                  <p className="text-green-600 font-bold">
                    ₹{item.product_price}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>

                <span className="font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove Item */}
              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total */}
<div className="mt-6 text-right">
  <h2 className="text-2xl font-bold">
    Total: ₹{total}
  </h2>

  <Link
    to="/checkout"
    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
  >
    Proceed to Checkout
  </Link>
</div>
        </div>
      )}
    </div>
  );
}

export default CartPage;