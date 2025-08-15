import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AboutUs from "./pages/AboutUs.js";
import ContactUs from "./pages/ContactUs.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Services from "./pages/Services.js";
import ResetPassword from "./pages/ResetPassword.js";
import Merch from "./pages/Merch.js";
import Header from "./components/Header.js";
import Home from "./pages/Home.js";
import Orders from "./pages/Orders.js";
import Profile from "./pages/Profile.js";
import Cart from "./pages/Cart.js";
import Footer from "./components/Footer.js";
import ForgotPassword from './pages/ForgotPassword.js';
import Payment from './pages/Payment.js';

function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Home /> : <Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={isLoggedIn ? <ResetPassword /> : <Login />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/orders" element={isLoggedIn ? <Orders /> : <Login />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
          <Route path="/payment" element={isLoggedIn ? <Payment /> : <Login />} />
          <Route path="/cart" element={isLoggedIn ? <Cart /> : <Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
