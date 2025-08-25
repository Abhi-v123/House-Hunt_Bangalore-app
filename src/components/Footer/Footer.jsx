import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-col">
          <h3>About</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do
            eiusmod tempor incididunt ut labore dolore magna aliqua enim ad
            minim veniam.
          </p>
          <p>
            Quis nostrud exercitation laboris nisi ut aliquip commodo.
          </p>
        </div>

        {/* Services Section */}
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#listing">Listing</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#blog">Our Blog</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Top News Section */}
        <div className="footer-col">
          <h3>Top News</h3>
          <div className="news-item">
            <img
              src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
              alt="News 1"
            />
            <div>
              <p className="news-title">The Added Value Social Worker</p>
              <span className="news-date">Mar 25, 2020</span>
            </div>
          </div>
          <div className="news-item">
            <img
              src="https://images.pexels.com/photos/32870/pexels-photo.jpg"
              alt="News 2"
            />
            <div>
              <p className="news-title">Ways to Increase Trust</p>
              <span className="news-date">Mar 24, 2020</span>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-col">
          <h3>Contacts</h3>
          <p><FaMapMarkerAlt /> Flat 20, Reynolds Neck, North Helenaville</p>
          <p><FaPhoneAlt /> +2 (305) 587-3407</p>
          <p><FaEnvelope /> info@example.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>House Hunt Bangalore © 2025 All Rights Reserved</p>
        <div className="footer-links">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
