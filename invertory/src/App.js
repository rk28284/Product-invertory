import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://inverty-backend.onrender.com/search",
        {
          params: {
            q: filters.q,
            category: filters.category,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          },
        }
      );
      setProduct(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Zeerostock
          </h1>
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-10 flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-[250px]">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">
              Product Name
            </label>
            <input
              name="q"
              type="text"
              placeholder="Search inventory..."
              className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 border focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="w-48">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">
              Category
            </label>
            <select
              name="category"
              className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Fitness">Fitness</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <div className="flex gap-3">
            <div className="w-28">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">
                Min $
              </label>
              <input
                name="minPrice"
                type="number"
                placeholder="0"
                className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={handleChange}
              />
            </div>
            <div className="w-28">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">
                Max $
              </label>
              <input
                name="maxPrice"
                type="number"
                placeholder="9999"
                className="w-full border-gray-200 rounded-xl p-3 bg-gray-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Searching inventory...</p>
          </div>
        ) : product.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.map((res) => (
              <div
                key={res.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {res.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {res.name}
                </h3>
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <p className="text-2xl font-black text-gray-900">
                    ${res.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-900 font-bold text-xl">No results found</p>
            <p className="text-gray-900 mt-1">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
