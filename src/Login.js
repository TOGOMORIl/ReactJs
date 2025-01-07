import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Login.css"; // Import the CSS file
import ecoFriendlyLogo from "./assets/EcoFriendly.jpg"; // Import the logo

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://i679yp6jmc.execute-api.us-east-1.amazonaws.com/dev/login", {
        username,
        password,
      });
      if (response.data.message) {
        alert("Login Successful: " + username);
        navigate("/home", { state: { username } }); // Redirect to Home with username
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "An error occurred.");
      } else {
        setErrorMessage("Server connection failed. Please try again later.");
      }
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Redirects to the register page
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={ecoFriendlyLogo} alt="Eco Friendly Logo" className="login-logo" />
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>If you don’t have an account</p>
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
