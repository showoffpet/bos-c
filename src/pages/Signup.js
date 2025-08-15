import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validate = () => {
    const errors = {};
    // Validate name
    if (!formData.name.trim()) errors.name = 'Name is required';
    //confirm password
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) return setErrors(validationErrors);

    try {
      await axios.post('http://localhost:5500/api/auth/register', formData);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data.message === 'Email already in use.') {
        setErrors({ email: 'This email is already registered' });
      } else {
        setErrors({ apiError: error.response?.data?.message || 'Registration failed' });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box" id="signUpBox">
        <h2>Sign Up</h2>
        <form id="signUpForm" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter Full Name" onChange={handleChange} value={formData.name} />
          {errors.name && <p className="error" style={{ color: 'red', marginTop: '0' }}>{errors.name}</p>}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} />
          {errors.confirmPassword && <p className="error" style={{ color: 'red', marginTop: '0' }}>{errors.confirmPassword}</p>}
          {errors.apiError && <p className="error" style={{ color: 'red', marginTop: '0' }}>{errors.apiError}</p>}
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
      </div>
    </div>
  );
};

export default Signup;
