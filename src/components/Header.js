import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);
  const closeProfile = () => setIsProfileOpen(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeProfile();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    closeProfile();
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  // Navigation component with active state
  const Navigation = () => {
    const location = useLocation();

    const isActive = (path) => {
      if (path === "/" && location.pathname === "/") return true;
      if (path !== "/" && location.pathname.startsWith(path)) return true;
      return false;
    };

    return (
      <nav
        id="primary-navigation"
        className={`nav-links ${isMenuOpen ? "open" : ""}`}
      >
        <Link
          to="/"
          className={isActive("/") ? "active" : ""}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="/services"
          className={isActive("/services") ? "active" : ""}
          onClick={closeMenu}
        >
          Services
        </Link>
        <Link
          to="/merch"
          className={isActive("/merch") ? "active" : ""}
          onClick={closeMenu}
        >
          Merch
        </Link>
        <Link
          to="/about-us"
          className={isActive("/about-us") ? "active" : ""}
          onClick={closeMenu}
        >
          About Us
        </Link>
        <Link
          to="/contact-us"
          className={isActive("/contact-us") ? "active" : ""}
          onClick={closeMenu}
        >
          Contact Us
        </Link>
        
        {/* Mobile-only auth, profile and cart elements */}
        <div className="mobile-auth-cart">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="auth-buttons" onClick={closeMenu}>
                Profile
              </Link>
            <Link onClick={handleLogout} className="auth-buttons">
              Logout
            </Link>
            </>
          ) : (
            <Link to="/login" className="auth-buttons">
              Login
            </Link>
          )}

          <button onClick={handleCartClick} className="cart-btn">
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>
    );
  };

  return (
    <header>
      <h1>BOS Courier</h1>
      <button
        className="hamburger"
        aria-label="Toggle navigation menu"
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        ☰
      </button>
      <Navigation />
      
      {/* Desktop-only auth, profile and cart elements */}
      <div className="auth-box desktop-only">
        {isLoggedIn ? (
          <div className="profile-dropdown">
            <button 
              className="profile-icon" 
              onClick={toggleProfile}
              aria-label="Profile menu"
            >
              👤
            </button>
            {isProfileOpen && (
              <div className="profile-menu">
                <button 
                  className="profile-menu-item" 
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
                <button 
                  className="profile-menu-item logout" 
                  onClick={handleLogout}
                >
            Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="auth-buttons">
            Login
          </Link>
        )}

        <button onClick={handleCartClick} className="cart-btn">
          🛒 Cart ({cartCount})
        </button>
      </div>
      
      {/* Click outside to close profile dropdown */}
      {isProfileOpen && (
        <div 
          className="profile-overlay" 
          onClick={closeProfile}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
        />
      )}
    </header>
  );
}

export default Header;
