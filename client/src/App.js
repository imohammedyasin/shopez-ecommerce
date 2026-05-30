import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Authentication from './pages/Authentication';

import Cart from './pages/customer/Cart';
import Profile from './pages/customer/Profile';
import CategoryProducts from './pages/customer/CategoryProducts';
import IndividualProduct from './pages/customer/IndividualProduct';

import Admin from './pages/admin/Admin';
import AllProducts from './pages/admin/AllProducts';
import AllUsers from './pages/admin/AllUsers';
import AllOrders from './pages/admin/AllOrders';
import NewProduct from './pages/admin/NewProduct';
import UpdateProduct from './pages/admin/UpdateProduct';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path='/auth' element={<Authentication />} />
        <Route exact path='' element={<Home />} />
        <Route path='/product/:id' element={<IndividualProduct />} />
        <Route path='/category/:category' element={<CategoryProducts />} />

        {/* Customer protected routes */}
        <Route path='/cart' element={
          <ProtectedRoute requiredRole="customer">
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute requiredRole="customer">
            <Profile />
          </ProtectedRoute>
        } />

        {/* Admin protected routes */}
        <Route path='/admin' element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        } />
        <Route path='/all-products' element={
          <ProtectedRoute requiredRole="admin">
            <AllProducts />
          </ProtectedRoute>
        } />
        <Route path='/all-users' element={
          <ProtectedRoute requiredRole="admin">
            <AllUsers />
          </ProtectedRoute>
        } />
        <Route path='/all-orders' element={
          <ProtectedRoute requiredRole="admin">
            <AllOrders />
          </ProtectedRoute>
        } />
        <Route path='/new-product' element={
          <ProtectedRoute requiredRole="admin">
            <NewProduct />
          </ProtectedRoute>
        } />
        <Route path='/update-product/:id' element={
          <ProtectedRoute requiredRole="admin">
            <UpdateProduct />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
