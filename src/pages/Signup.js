import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="form-box" id="signUpBox">
        <h2>Sign Up</h2>
        <form id="signUpForm">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit" className="cta-button">
            Create Account
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </form>
        <p>
          <Link to="/reset-password">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
