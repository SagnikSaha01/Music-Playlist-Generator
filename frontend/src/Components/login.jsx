import React from "react";
import CaptureImage from "../Images/image1.jpeg";

const Login = () => {
  return (
    <div className="login-container">
      {/* Left Section with the Image */}
      <div className="image-section">
        <img src={CaptureImage} alt="Decorative" className="background-image" />
      </div>

      {/* Right Section with the Form */}
      <div className="form-section">
        <form className="login-form">
          <label>Email</label>
          <input type="text" placeholder="Email" className="input-field" />
          <label>Password</label>
          <input type="password" placeholder="Password" className="input-field" />
          <button type="submit" className="submit-button">Login</button>
        </form>
        <a href="#" className="signup-link">Sign up</a>
      </div>
    </div>
  );
};

export default Login;