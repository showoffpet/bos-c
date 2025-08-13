import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs.js";
import ContactUs from "./pages/ContactUs.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Services from "./pages/Services.js";
import ResetPassword from "./pages/ResetPassword.js";

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>BOS Courier</h1>
          <nav>
            <Link to="/" className="active">
              Home
            </Link>
            <Link to="/services">Services</Link>
            <Link to="/store">Store</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
          </nav>
          <div>
            <Link to="/login" className="auth-buttons">
              Login
            </Link>
          </div>
          <div>
            <Link to="/cart" className="cart-button">
              <img src="/images/cart.png" alt="Cart" style={{ height: "40px" }} />
            </Link>
          </div>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="hero">
                    <h2>Fast. Reliable. BOS Courier.</h2>
                    <p>
                      Delivering packages with precision and speed across the
                      nation. Choose BOS Courier for unmatched delivery
                      performance and customer care.
                    </p>
                    <Link to="/services" className="cta-button">
                      View Our Services
                    </Link>
                  </section>

                  <section className="features">
                    <h3>What We Offer</h3>
                    <div className="feature-grid">
                      <div className="feature">
                        <h4>Same-Day Delivery</h4>
                        <p>
                          Need it there today? We make it happen with guaranteed
                          same-day service.
                        </p>
                      </div>
                      <div className="feature">
                        <h4>Real-Time Tracking</h4>
                        <p>
                          Track your delivery every step of the way with our
                          live GPS tracking system.
                        </p>
                      </div>
                      <div className="feature">
                        <h4>Secure Handling</h4>
                        <p>
                          From pickup to drop-off, your parcel is in safe,
                          professional hands.
                        </p>
                      </div>
                    </div>
                  </section>
                </>
              }
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>

        <footer>
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@boscourier.com">info@boscourier.com</a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+2347001234567">+234 700 123 4567</a>
            </p>
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                style={{ color: "white" }}
                href="https://instagram.com/boscourier"
              >
                @boscourier
              </a>
            </p>
            <p>
              <strong>Office:</strong> 12A Logistics Blvd, Lagos, Nigeria
            </p>
          </div>
          <p>&copy; 2025 BOS Courier. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
