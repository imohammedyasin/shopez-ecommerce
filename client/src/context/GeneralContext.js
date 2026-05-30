import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  const [productSearch, setProductSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Axios interceptor to always attach JWT if exists
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    // Only fetch cart for logged-in customers
    if (!token || userType !== 'customer') return;

    try {
      const response = await axios.get('/api/cart/fetch-cart');
      setCartCount(response.data.length);
    } catch (err) {
      // Silently fail for unauthenticated users
      console.error("Cart fetch error:", err);
    }
  };

  const handleSearch = () => {
    navigate('#products-body');
  };

  // LOGIN
  const login = async () => {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    try {
      const loginInputs = {
        email: email.trim(),
        password: password
      };

      const res = await axios.post('/api/users/login', loginInputs);

      // Save user data + token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!!");
    }
  };

  // REGISTER
  const register = async () => {
    if (!username || !email || !password || !usertype) {
      alert("All fields are required!");
      return;
    }

    try {
      const inputs = { username, email, usertype, password };
      const res = await axios.post('/api/users/register', inputs);

      // Save user data + token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!!");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate('/');
  };

  return (
    <GeneralContext.Provider
      value={{
        login, register, logout,
        username, setUsername,
        email, setEmail,
        password, setPassword,
        usertype, setUsertype,
        productSearch, setProductSearch,
        handleSearch,
        cartCount, setCartCount,
        fetchCartCount
      }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
