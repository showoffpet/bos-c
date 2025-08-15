import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({}); // Reset errors whenever the user changes the input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors on form submission

    // Validate email
    if (!formData.email) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    }

    // Validate password
    if (!formData.password) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
    }

    try {
      const res = await axios.post(
        "http://localhost:5500/api/auth/login",
        formData
      );
      console.log("Login success:", res.data);
      const { token, user } = res.data;

      // Save the token and user info
      login(token, user);

      navigate("");
    } catch (error) {
      // If the server responds with specific error messages, handle them
      if (error.response && error.response.data) {
        const { message } = error.response.data;

        // Handle error messages from backend
        if (message === "Email does not exist.") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email does not exist.",
          }));
        } else if (message === "Incorrect password.") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Incorrect password.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            apiError: message || "Login failed.",
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: "Something went wrong. Please try again.",
        }));
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box" id="loginBox">
        <h2>Login</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          {errors.email && (
            <p className="error" style={{ color: "red", marginTop: "0" }}>
              {errors.email}
            </p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          {errors.password && (
            <p className="error" style={{ color: "red", marginTop: "0" }}>
              {errors.password}
            </p>
          )}
          {errors.apiError && (
            <p className="error" style={{ color: "red", marginTop: "0" }}>
              {errors.apiError}
            </p>
          )}
          <button type="submit" className="cta-button">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
          <p>
            <Link to="/reset-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
