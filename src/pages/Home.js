import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="hero">
        <h2>Fast. Reliable. BOS Courier.</h2>
        <p>
          Delivering packages with precision and speed across the nation. Choose
          BOS Courier for unmatched delivery performance and customer care.
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
              Need it there today? We make it happen with guaranteed same-day
              service.
            </p>
          </div>
          <div className="feature">
            <h4>Real-Time Tracking</h4>
            <p>
              Track your delivery every step of the way with our live GPS
              tracking system.
            </p>
          </div>
          <div className="feature">
            <h4>Secure Handling</h4>
            <p>
              From pickup to drop-off, your parcel is in safe, professional
              hands.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
