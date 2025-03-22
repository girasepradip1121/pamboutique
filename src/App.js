import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./component/Header";
import Footer from "./component/Footer";
import User from "./component/User";
import Login from "./component/Login";
import Home from "./component/Home";
import Contact from "./component/Contact";
import Shop from "./component/Shop";
import ProductPage from "./component/ProductPage"; 
import CheckOut from "./component/CheckOut";
import AdminLayoutComponent from "./component/AdminLayoutComponent";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import ManageContact from "./pages/ManageContact";
import AcceptedOrders from "./pages/AcceptedOrders";
import AdminRoute from "./AdminRoute"; 
import Category from "./pages/Category";

const App = () => {
  
  return (
    <Router>
      <Routes>
        {/* ✅ User Panel Routes with Header & Footer */}
        <Route path="/*" element={
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/user" element={<User />} />
              <Route path="/login" element={<Login />} />
              <Route path="/productpage" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
            <Footer />
          </>
        } />

        {/* ✅ Admin Panel Routes (Protected with AdminRoute) */}
        <Route path="/admin/*" element={
          <AdminRoute>
            <AdminLayoutComponent />
          </AdminRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<Product />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="accepted-orders" element={<AcceptedOrders />} />
          <Route path="manage-contact" element={<ManageContact />} />

        </Route>

        {/* Catch-All for Unauthorized Access */}
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </Router> 
  );
};

export default App;
