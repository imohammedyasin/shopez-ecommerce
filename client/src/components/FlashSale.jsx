import React, { useEffect, useState } from 'react';
import '../styles/FlashSale.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FlashSale = () => {
  const [flashProducts, setFlashProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlashSaleProducts();
  }, []);

  const fetchFlashSaleProducts = async () => {
    try {
      const response = await axios.get('/api/products/fetch-products');
      const products = Array.isArray(response.data) ? response.data : [];
      // Get top 6 products with highest discount
      const sorted = [...products].sort((a, b) => b.discount - a.discount).slice(0, 6);
      setFlashProducts(sorted);
    } catch (err) {
      console.error("Error fetching flash sale products:", err);
    }
  };

  if (flashProducts.length === 0) return null;

  return (
    <div className="flashSaleContainer">
      <h3>⚡ Flash Sale - Top Deals</h3>
      <div className="flashSale-body">
        {flashProducts.map((product) => (
          <div className="flashSaleCard" key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
            <img src={product.mainImg} alt={product.title} />
            <div className="flashSaleCard-data">
              <h6>{product.title}</h6>
              <p>&#8377; {parseInt(product.price - (product.price * product.discount) / 100)}</p>
              <h5>{product.discount}% off</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
