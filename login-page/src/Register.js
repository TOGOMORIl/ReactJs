import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Register.css";

import ecoFriendlyLogo from "./assets/EcoFriendly.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    setSuccessMessage(""); // Clear previous success message

    if (!username || !password) {
      setErrorMessage("Both username and password are required.");
      return;
    }

    try {
      const response = await axios.post("https://i679yp6jmc.execute-api.us-east-1.amazonaws.com/dev/register", {
        username,
        password,
      });
      if (response.data.message) {
        setSuccessMessage(response.data.message); // Show success message
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after success
        }, 2000); // Wait 2 seconds before redirecting
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "An error occurred.");
      } else {
        setErrorMessage("Server connection failed. Please try again later.");
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <img src={ecoFriendlyLogo} alt="EcoFriendly Logo" className="register-logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
