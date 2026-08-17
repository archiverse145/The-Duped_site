import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRouter from "./components/PrivateRouter";

import Navbar from "./components/Navbar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              searchQuery={searchQuery}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route element={<PrivateRouter />}>
          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />
        </Route>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>
    </Router>
  );
}

export default App;