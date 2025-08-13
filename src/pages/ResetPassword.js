import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Reset Password</h2>
        <form id="resetForm">
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="New Password" required />
          <input type="password" placeholder="Confirm New Password" required />
          <button type="submit" className="cta-button">
            Reset Password
          </button>
          <p>
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
