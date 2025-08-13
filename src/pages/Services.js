import React from "react";

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
          <a href="same-day-order.html" className="cta-button small">
            Place Order
          </a>
        </div>
        <div className="service-box">
          <img src="images/nextday.jpeg" alt="Next Day Delivery" />
          <h3>Next-Day Delivery</h3>
          <p>
            Reliable next-day service for businesses and individuals across the
            country.
          </p>
          <span className="price-tag">$18</span>
          <a href="same-day-order.html" className="cta-button small">
            Place Order
          </a>
        </div>
        <div className="service-box">
          <img src="images/bulk.jpeg" alt="Bulk Logistics" />
          <h3>Bulk/Business Logistics</h3>
          <p>
            Tailored courier solutions for recurring pickups, bulk orders, and
            enterprise clients.
          </p>
          <span className="price-tag">$99+</span>
          <a href="same-day-order.html" className="cta-button small">
            Place Order
          </a>
        </div>
        <div className="service-box">
          <img src="images/international.jpeg" alt="International Shipping" />
          <h3>International Shipping</h3>
          <p>
            Send packages across borders with trusted global delivery partners.
          </p>
          <span className="price-tag">$50+</span>
          <a href="same-day-order.html" className="cta-button small">
            Place Order
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;
