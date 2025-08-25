import React from "react";
import "./Navbar.css";
import { MdOutlineRealEstateAgent } from "react-icons/md";

export default function Navbar({ user, openLogin, handleLogout }) {
  
  return (
    <nav className="navbar">
  <div className="logo-container">
    <MdOutlineRealEstateAgent
      size={30}
      className="nav-icon"
      aria-label="House Hunt Bangalore Logo"
    />
    <span className="nav-title">House Hunt Bangalore</span>
  </div>
  <div className="nav-container">
    <a href="#home" className="nav-item">Home</a>
    <a href="#property" className="nav-item">Property</a>
    <a href="#agency" className="nav-item">Agency</a>
    <a href="#contact" className="nav-item">Contact</a>
    <a href="#about" className="nav-item">About Us</a>
    {user ? (
      <>
        <span className="nav-username">Hello, {user.username}</span>
        <button onClick={handleLogout} className="nav-item logout-button">
          Logout
        </button>
      </>
    ) : (
      <button onClick={openLogin} className="nav-item btn-link">Login</button>
    )}
  </div>
</nav>

  );
}
