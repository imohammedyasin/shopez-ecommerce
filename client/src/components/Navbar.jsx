import React, { useContext, useEffect, useState } from 'react';
import { BsCart3, BsPersonCircle } from 'react-icons/bs';
import { FcSearch } from 'react-icons/fc';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import { ImCancelCircle } from 'react-icons/im';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  const usertype = localStorage.getItem('userType');
  const username = localStorage.getItem('username');

  const { cartCount, logout } = useContext(GeneralContext);

  const [productSearch, setProductSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!productSearch.trim()) return;

    try {
      const response = await axios.get(`/api/products/fetch-products?search=${encodeURIComponent(productSearch)}`);
      const results = Array.isArray(response.data) ? response.data : response.data.products || [];

      if (results.length > 0) {
        setSearchResults(results.slice(0, 5));
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(true);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const closeSearch = () => {
    setShowResults(false);
    setSearchResults([]);
    setProductSearch('');
  };

  return (
    <>
      {/* Guest navbar */}
      {!usertype ? (
        <div className="navbar">
          <h3 onClick={() => navigate('')}>ShopEZ</h3>
          <div className="nav-content">
            <div className="nav-search">
              <input
                type="text"
                name="nav-search"
                id="nav-search"
                placeholder="Search products, categories..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                onKeyDown={handleSearchKeyPress}
              />
              <FcSearch className="nav-search-icon" onClick={handleSearch} />
              {showResults && (
                <div className="search-result-data">
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product) => (
                        <div
                          key={product._id}
                          className="search-result-item"
                          onClick={() => { navigate(`/product/${product._id}`); closeSearch(); }}
                        >
                          <img src={product.mainImg} alt={product.title} style={{ width: '30px', height: '30px', objectFit: 'cover', marginRight: '10px' }} />
                          <span>{product.title}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>No products found</p>
                  )}
                  <ImCancelCircle className="search-result-data-close-btn" onClick={closeSearch} />
                </div>
              )}
            </div>
            <button className="btn" onClick={() => navigate('/auth')}>Login</button>
          </div>
        </div>
      ) : (
        <>
          {usertype === 'customer' ? (
            <div className="navbar">
              <h3 onClick={() => navigate('')}>ShopEZ</h3>
              <div className="nav-content">
                <div className="nav-search">
                  <input
                    type="text"
                    name="nav-search"
                    id="nav-search"
                    placeholder="Search products, categories..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    onKeyDown={handleSearchKeyPress}
                  />
                  <FcSearch className="nav-search-icon" onClick={handleSearch} />
                  {showResults && (
                    <div className="search-result-data">
                      {searchResults.length > 0 ? (
                        <>
                          {searchResults.map((product) => (
                            <div
                              key={product._id}
                              className="search-result-item"
                              onClick={() => { navigate(`/product/${product._id}`); closeSearch(); }}
                            >
                              <img src={product.mainImg} alt={product.title} style={{ width: '30px', height: '30px', objectFit: 'cover', marginRight: '10px' }} />
                              <span>{product.title}</span>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>No products found</p>
                      )}
                      <ImCancelCircle className="search-result-data-close-btn" onClick={closeSearch} />
                    </div>
                  )}
                </div>

                <div className="nav-content-icons">
                  <div className="nav-profile" onClick={() => navigate('/profile')}>
                    <BsPersonCircle className="navbar-icons" title="Profile" />
                    <p>{username}</p>
                  </div>
                  <div className="nav-cart" onClick={() => navigate('/cart')}>
                    <BsCart3 className="navbar-icons" title="Cart" />
                    <div className="cart-count">{cartCount}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-admin">
              <h3 onClick={() => navigate('/admin')}>ShopEZ (admin)</h3>
              <ul>
                <li onClick={() => navigate('/admin')}>Home</li>
                <li onClick={() => navigate('/all-users')}>Users</li>
                <li onClick={() => navigate('/all-orders')}>Orders</li>
                <li onClick={() => navigate('/all-products')}>Products</li>
                <li onClick={() => navigate('/new-product')}>New Product</li>
                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
