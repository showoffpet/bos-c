import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      
      const res = await axios.post("/auth/forgot-password", { email });
      
      setMessage(res.data.message);
      setResetUrl(res.data.resetUrl);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Forgot Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
          
          {resetUrl && (
            <div className="reset-link">
              <p><strong>Reset Link:</strong></p>
              <a href={resetUrl} className="reset-url">{resetUrl}</a>
              <p className="note">Click the link above to reset your password</p>
            </div>
          )}
          
          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          
          <p>
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 