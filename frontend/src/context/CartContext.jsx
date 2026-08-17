import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authFetch, getAccessToken } from "../utils/auth";
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  // Backend API URL
  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL ||
    "http://127.0.0.1:8000";

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Total cart amount
  const [total, setTotal] = useState(0);

  // Fetch cart data from backend
  const fetchCart = async () => {
    try {
      const res = await authFetch(`${BASEURL}/api/cart/`);

      const data = await res.json();

      // Update cart state
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error
      );
    }
  };

  // Load cart when application starts
  useEffect(() => {
    fetchCart();
  }, [BASEURL]);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const response = await authFetch(
        `${BASEURL}/api/cart/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            product_id: product.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to add product"
        );
      }

      // Refresh cart
      await fetchCart();
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error
      );
    }
  };

  // Remove item from cart
  const removeFromCart = async (
    itemId
  ) => {
    try {
      const response = await authFetch(
        `${BASEURL}/api/cart/remove/`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            item_id: itemId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to remove item"
        );
      }

      // Refresh cart
      await fetchCart();
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error
      );
    }
  };

  // Update quantity of an item
  const updateQuantity = async (
    itemId,
    quantity
  ) => {
    // Remove item if quantity becomes 0
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const response = await authFetch(
        `${BASEURL}/api/cart/update/`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            item_id: itemId,
            quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update quantity"
        );
      }

      // Refresh cart
      await fetchCart();
    } catch (error) {
      console.error(
        "Error updating quantity:",
        error
      );
    }
  };

  // Clear local cart state
  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};