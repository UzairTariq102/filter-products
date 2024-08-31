import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        console.log(data);

        setFilteredProducts(data);
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    filterProducts(value, category, sortOrder);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    filterProducts(searchTerm, value, sortOrder);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    filterProducts(searchTerm, category, value);
  };

  const filterProducts = (searchTerm, category, sortOrder) => {
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    if (category) {
      updatedProducts = updatedProducts.filter(product =>
        product.category.name.toLowerCase() === category.toLowerCase()
      );
    }

    if (sortOrder) {
      updatedProducts = updatedProducts.sort((a, b) => {
        if (sortOrder === 'low-to-high') {
          return a.price - b.price;
        } else if (sortOrder === 'high-to-low') {
          return b.price - a.price;
        }
        return 0;
      });
    }

    setFilteredProducts(updatedProducts);
  };

  return (
    <div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="shoes">Shoes</option>
        </select>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="products-container">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.images[0]} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
