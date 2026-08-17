// React hook
import { useState } from "react";
import {authFetch} from "../utils/auth";
// React Router hook
import { useNavigate } from "react-router-dom";

// Cart context
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  // Backend URL
  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL ||
    "http://127.0.0.1:8000";

  // Navigation hook
  const navigate = useNavigate();

  // Cart function
  const { clearCart } = useCart();

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  // UI states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle order submission
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setMessage("");

    const response = await authFetch(
      `${BASEURL}/api/orders/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      clearCart();

      setMessage("Order placed successfully!");
      setTimeout(() => {
  navigate("/");
}, 2000);
    } else {
      setMessage(
        data.error ||
        data.message ||
        "Failed to place order"
      );
    }
  } catch (error) {
  console.error("Order Error:", error);
  setMessage(error.message);
} finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Checkout
        </h1>

        {/* Success / Error Message */}
        {message && (
          <p className="text-center mb-4 text-green-600">
            {message}
          </p>
        )}

        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Customer Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Delivery Address */}
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Phone Number */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Payment Method */}
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="COD">
              Cash on Delivery
            </option>

            <option value="ONLINE">
              Online Payment
            </option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
          {message && (
            <p className="text-center text-green-700 font-semibold mt-4">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;