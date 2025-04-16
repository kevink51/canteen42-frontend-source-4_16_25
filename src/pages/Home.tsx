import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_API_URL as string || 'https://canteen42-backend-rebuild.onrender.com';

interface Product {
  id: string;
  name?: string;
  title?: string;
  description: string;
  price: number;
  image?: string;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <div>
          {isLoggedIn ? (
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsLoggedIn(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="products">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 shadow-sm">
                  <h3 className="text-xl font-semibold">{product.name || product.title}</h3>
                  {product.image && <img src={product.image} alt={product.name || product.title} className="my-2 rounded" />}
                  <p className="text-gray-600 my-2">{product.description}</p>
                  <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Home;
