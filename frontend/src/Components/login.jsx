import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import CaptureImage from "../Images/loginImage.jpeg";

const Login = () => {

  const navigate = useNavigate();

  // Local states to hold form data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // On submit, call the backend /api/login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Construct form-encoded data
      const formData = qs.stringify({
        username,
        password,
      });
  
      // const response = await axios.post(
      //   'http://localhost:3000/api/login',
      //   {
      //     username,
      //     password
      //   });

      const response = await axios.post(
        'http://localhost:3000/api/login',
        { username, password },
        { withCredentials: true } // Include cookies in the request
      );
  
      if (response.status === 200) {
        console.log('Login successful, redirecting...');
        navigate('/');
      }
      console.log("HI");
    } catch (error) {
      console.log(error);
      console.error(error.response?.data || error.message);
      alert('Invalid username or password, please try again');
      // alert(error);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section with the Image */}
      <div className="image-section">
        <img src={CaptureImage} alt="Decorative" className="background-image" />
      </div>

      {/* Right Section with the Form */}
      <div className="form-section">
        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input type="text" placeholder="Email" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="submit-button">Login</button>
        </form>
        <a href="#" className="signup-link">Sign up</a>
      </div>
    </div>
  );
};

export default Login;