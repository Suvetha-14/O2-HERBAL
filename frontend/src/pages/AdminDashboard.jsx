import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';

const AdminDashboard = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'soap',
    price: '',
    image: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.image && newProduct.description) {
      addProduct({
        ...newProduct,
        price: parseFloat(newProduct.price)
      });
      setNewProduct({
        name: '',
        category: 'soap',
        price: '',
        image: '',
        description: ''
      });
    }
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="soap">Soap</option>
              <option value="shampoo">Shampoo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image Path</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2 rounded" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
