import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if token exists
  if (!token) {
    return (
      <div className="auth-container">
        <div className="form-box">
          <h2>Invalid Reset Link</h2>
          <p className="error">This reset password link is invalid or missing a token.</p>
          <Link to="/profile" className="cta-button">Back to Profile</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Please confirm your password";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (formData.password.length < 6) 
      errors.password = "Password must be at least 6 characters long";

    if (Object.keys(errors).length > 0) {
      return setErrors(errors); // Show errors if any
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `/auth/reset-password/${token}`,
        {
          password: formData.password,
        }
      );

      setMessage(res.data.message);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setErrors({ apiError: err.response?.data?.message || "Password change failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h2>Change Password</h2>
        <p>Enter your new password below.</p>
        <form id="resetForm" onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          {errors.apiError && (
            <p className="color-red error">{errors.apiError}</p>
          )}
          {message && <p className="color-green success">{message}</p>}
          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </button>
          <p>
            <Link to="/profile">Back to Profile</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
