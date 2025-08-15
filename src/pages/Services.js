import React from "react";
import { Link } from "react-router-dom";

function Services() {
  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="service-grid">
        <div className="service-box">
          <img src="images/sameday.jpeg" alt="Same Day Delivery" />
          <h3>Same-Day Delivery</h3>
          <p>
            Urgent deliveries handled with speed and precision—guaranteed to
            arrive the same day.
          </p>
          <span className="price-tag">$25</span>
          <Link to="/orders?service=Same-Day Delivery" className="cta-button small">
            Place Order
          </Link>
        </div>
        <div className="service-box">
          <img src="images/nextday.jpeg" alt="Next Day Delivery" />
          <h3>Next-Day Delivery</h3>
          <p>
            Reliable next-day service for businesses and individuals across the
            country.
          </p>
          <span className="price-tag">$18</span>
          <Link to="/orders?service=Next-Day Delivery" className="cta-button small">
            Place Order
          </Link>
        </div>
        <div className="service-box">
          <img src="images/bulk.jpeg" alt="Bulk Logistics" />
          <h3>Bulk/Business Logistics</h3>
          <p>
            Tailored courier solutions for recurring pickups, bulk orders, and
            enterprise clients.
          </p>
          <span className="price-tag">$99+</span>
          <Link to="/orders?service=Bulk/Business Logistics" className="cta-button small">
            Place Order
          </Link>
        </div>
        <div className="service-box">
          <img src="images/international.jpeg" alt="International Shipping" />
          <h3>International Shipping</h3>
          <p>
            Send packages across borders with trusted global delivery partners.
          </p>
          <span className="price-tag">$50+</span>
          <Link to="/orders?service=International Shipping" className="cta-button small">
            Place Order
          </Link>
        </div>
        <div className="service-box">
          <img src="images/international.jpeg" alt="merch shopping" />
          <h3>Order Merch</h3>
          <p>
            Order our merch and support our brand. Get delivery to your door step.
          </p>
          <Link to="/merch" className="cta-button small">
            Place Order
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
