import React from 'react'

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted");
  };
  return (
    <div className="contact-container">
    <div className="contact-box">
      <h2>Contact Us</h2>
      <form id="contactForm" onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Full Name" required />
        <input type="email" id="email" placeholder="Email Address" required />
        <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
  )
};

export default ContactUs;