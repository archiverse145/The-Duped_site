import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductList({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentBanner, setCurrentBanner] = useState(0);

  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    Promise.all([
      fetch(`${BASEURL}/api/products/`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      }),

      fetch(`${BASEURL}/api/categories/`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      }),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [BASEURL]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const banners = [
    "🔥 FLAT 50% OFF ON TOPS",
    "💖 BUY 2 GET 1 FREE",
    "✨ NEW ARRIVALS JUST DROPPED",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.name?.toLowerCase() ===
        selectedCategory.toLowerCase();

    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading catalog...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Sale Banner */}
        <div className="mb-8">
          <div className="bg-pink-500 text-white text-center py-6 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold">
              {banners[currentBanner]}
            </h2>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedCategory === "All"
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === cat.name
                  ? "bg-pink-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No products found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;