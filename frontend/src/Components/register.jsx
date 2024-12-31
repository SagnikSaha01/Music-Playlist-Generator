import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CaptureImage from "../Images/loginImage.jpeg";

const Register = () => {
  const navigate = useNavigate();

  // Local states to hold form data
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // On submit, call the backend /api/register
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/register',
        { displayName, username, password }, // Updated request payload
        { withCredentials: true } // Include cookies in the request
      );

      if (response.status === 201) {
        console.log('Registration successful, redirecting...');
        navigate('/login'); // Redirect to login page after registration
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Registration failed, please try again');
    }
  };

  return (
    <div className="register-container">
      {/* Left Section with the Image */}
      <div className="image-section">
        <img src={CaptureImage} alt="Decorative" className="background-image" />
      </div>

      {/* Right Section with the Form */}
      <div className="form-section">
        <form className="register-form" onSubmit={handleRegister}>
          <label>Display Name</label>
          <input
            type="text"
            placeholder="Display Name"
            className="input-field"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">Register</button>
        </form>
        <a href="/login" className="login-link">Already have an account? Log in</a>
      </div>
    </div>
  );
};

export default Register;
