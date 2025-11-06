import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products.js';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
