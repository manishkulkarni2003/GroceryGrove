import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

const ProductCard = ({ product }) =>
  { 
    const dispatch =useDispatch();
    const handleAddToCart=()=>{
      dispatch(addItem(product))
    }

    return(
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="aspect-w-1 aspect-h-1">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      <p className="text-green-600 font-medium text-lg mb-2">
      ₹{parseFloat(product.price).toFixed(2)}
      </p>
      <p className="text-sm text-gray-500">
        Seller: {product.owner?.name || 'Unknown'}
      </p>
      <button onClick={handleAddToCart}
       className='bg-red-700 text-white rounded-md p-3 hover:bg-red-500'>Add to Cart</button>
    </div>
  </div>
)};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/product/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export { ProductCard, ProductList };