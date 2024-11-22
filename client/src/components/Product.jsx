import React, { useState } from "react";
import axios from "axios";

const Product = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setProductData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.price || !productData.image) {
      setUploadStatus("Please fill all fields and upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("image", productData.image);

      const response = await axios.post("http://localhost:8080/product/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setUploadStatus("Product uploaded successfully!");
        setProductData({ name: "", price: "", image: null });
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      setUploadStatus("Failed to upload product. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Upload Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Upload Product
          </button>
        </form>

        {/* Upload Status */}
        {uploadStatus && (
          <p
            className={`mt-4 text-center font-medium ${
              uploadStatus.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
