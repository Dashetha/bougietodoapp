import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import this
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // <-- Add this

  // Use relative paths from public/assets
  const images = [
    "/assets/pink1.jpg",
    "/assets/pink2.jpg",
    "/assets/pink3.jpg",
    "/assets/pink1.jpg"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Change image every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    // alert("Login Successful!");
    navigate("/todo"); // <-- Redirect to todo page
  };

  return (
    <div className="login-wrapper">
      {/* Background Images Layer */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`bg-slide ${index === currentImage ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      {/* Login Form */}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to your account</p>

          {error && <div className="error">{error}</div>}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <p className="register-link">
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
