import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import Products from '../components/Products';
import Footer from '../components/Footer';
import FlashSale from '../components/FlashSale';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [bannerImg, setBannerImg] = useState('');

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await axios.get("/api/banners");
      setBannerImg(response.data);
    } catch (err) {
      console.error("Failed to fetch banner:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="HomePage">
      {/* Hero Banner */}
      <div className="home-banner">
        {bannerImg ? (
          <img src={bannerImg} alt="ShopEZ Banner" />
        ) : (
          <div className="home-banner-placeholder">
            <h1>Welcome to ShopEZ</h1>
            <p>Your one-stop destination for everything you need</p>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="home-categories-container">
        <div className="home-category-card" onClick={() => navigate('/category/Fashion')}>
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop" alt="Fashion" />
          <h5>Fashion</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Electronics')}>
          <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop" alt="Electronics" />
          <h5>Electronics</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Mobiles')}>
          <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" alt="Mobiles" />
          <h5>Mobiles</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Groceries')}>
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop" alt="Groceries" />
          <h5>Groceries</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Sports-Equipment')}>
          <img src="https://images.unsplash.com/photo-1461896836934-bd45f5db65c1?w=200&h=200&fit=crop" alt="Sports" />
          <h5>Sports</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Home & Kitchen')}>
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" alt="Home & Kitchen" />
          <h5>Home & Kitchen</h5>
        </div>

        <div className="home-category-card" onClick={() => navigate('/category/Books')}>
          <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop" alt="Books" />
          <h5>Books</h5>
        </div>
      </div>

      {/* Flash Sale */}
      <FlashSale />

      {/* All Products */}
      <div id="products-body"></div>
      <Products category="all" />

      <Footer />
    </div>
  );
};

export default Home;
