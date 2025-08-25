import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./Contact.css";
import { Link } from "react-router-dom";



export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${formData.name}, we received your message!`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="contact-page">
      <h2 className="contact-header">Get in Touch</h2>

      <div className="contact-container">
        {/* Left: Contact Info */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><FaMapMarkerAlt /> Flat 20, Reynolds Neck, Bangalore</p>
          <p><FaPhoneAlt /> +91 98765 43210</p>
          <p><FaEnvelope /> support@househunt.com</p>
          <p>
            We’d love to hear from you. Fill out the form and our team will get
            back to you as soon as possible.
          </p>
        </div>

        {/* Right: Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="send-button">Send Message</button>
        </form>
      </div>
    </section>
  );
}
