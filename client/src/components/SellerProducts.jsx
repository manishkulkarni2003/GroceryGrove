import React, { useState, useEffect } from "react";
import axios from "axios";

const SellerProducts = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/products/${sellerId}`);
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, [sellerId]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <h2 className="text-2xl font-semibold mb-5">Your Uploaded Products</h2>
      {error && <p className="text-red-500">{error}</p>}

      {products.length === 0 ? (
        <p className="text-gray-500">You have not uploaded any products yet.</p>
      ) : (
        <div>
          <p className="text-lg mb-4">Total Products: {products.length}</p>
          <ul>
            {products.map((product) => (
              <li key={product._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                <div>
                  <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-3" />
                  <h3 className="font-semibold text-xl">{product.name}</h3>
                  <p className="text-gray-600">Price: ${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
