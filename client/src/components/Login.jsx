import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {
  const { email, setEmail, password, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    await login();
  }

  const handleQuickLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    // Allow brief state update propagation, then submit login
    setTimeout(async () => {
      await login();
    }, 100);
  };

  return (
    <form className="authForm" onSubmit={handleLogin}>
      <h2>Login</h2>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Email address</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password</label>
      </div>

      <button type="submit" className="btn btn-primary w-100 py-2">Sign in</button>

      <div className="quick-login-container mt-4 pt-3 border-top w-100 text-center">
        <p className="text-muted small mb-2">Or run with demo accounts:</p>
        <div className="d-flex gap-2 justify-content-center">
          <button 
            type="button" 
            className="btn btn-outline-danger btn-sm px-3"
            onClick={() => handleQuickLogin('admin@shopez.com', 'admin123')}
          >
            Log in as Admin
          </button>
          <button 
            type="button" 
            className="btn btn-outline-primary btn-sm px-3"
            onClick={() => handleQuickLogin('john@example.com', 'customer123')}
          >
            Log in as Customer
          </button>
        </div>
      </div>

      <p className="mt-3">Not registered? <span onClick={() => setIsLogin(false)} style={{ cursor: 'pointer', color: '#0d6efd', textDecoration: 'underline' }}>Register</span></p>
    </form>
  );
}

export default Login;
