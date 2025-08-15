import React from "react";

const Footer = () => {
  return (
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
          <a style={{ color: "white" }} href="https://instagram.com/boscourier">
            @boscourier
          </a>
        </p>
        <p>
          <strong>Office:</strong> 12A Logistics Blvd, Lagos, Nigeria
        </p>
      </div>
      <p>&copy; 2025 BOS Courier. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
