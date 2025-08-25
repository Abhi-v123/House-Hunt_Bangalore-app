import React from "react";
import "./AboutUs.css";
import { FaHome, FaHandshake, FaLightbulb, FaBuilding } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="aboutus-section" id="about">
      {/* Hero Banner */}
      <div className="aboutus-hero">
         <div className="overlay"></div>
        <h1>About House Hunt Bangalore</h1>
        <p>Your trusted partner in finding dream homes & investments</p>
      </div>

      {/* Intro */}
      <div className="aboutus-intro">
        <p>
          Welcome to <strong>House Hunt Bangalore</strong>, your premier
          destination for finding the perfect property in Bangalore and beyond.
          With expert agents and curated collections, we help you discover both
          existing and upcoming real estate opportunities tailored to your needs.
        </p>
      </div>

      {/* Mission / Vision / Values */}
      <div className="aboutus-highlights">
        <div className="highlight-card">
          <FaHome size={40} className="highlight-icon" />
          <h3>Our Mission</h3>
          <p>To connect people with their dream homes and investment opportunities with trust and transparency.</p>
        </div>
        <div className="highlight-card">
          <FaHandshake size={40} className="highlight-icon" />
          <h3>Trusted Partners</h3>
          <p>We work with leading builders and developers to ensure quality projects and secure investments.</p>
        </div>
        <div className="highlight-card">
          <FaLightbulb size={40} className="highlight-icon" />
          <h3>Innovative Solutions</h3>
          <p>We leverage technology to make property search seamless, personalized, and efficient.</p>
        </div>
      </div>

      {/* Properties */}
      <h2>Our Properties</h2>
      <p>
        Explore our wide range of apartments, villas, and commercial spaces built
        with quality, comfort, and prime locations in mind. Whether you are buying,
        renting, or investing, our properties meet diverse budgets and preferences.
      </p>

      {/* Upcoming Projects Grid */}
      <h2>Upcoming Projects</h2>
      <div className="upcoming-projects">
        <div className="project-card">
          <img src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" alt="Luxury Villa" />
          <h4>Luxury Villas, Whitefield</h4>
          <p>Premium gated community villas with world-class amenities.</p>
        </div>
        <div className="project-card">
          <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" alt="Smart Apartments" />
          <h4>Smart Apartments, Electronic City</h4>
          <p>Modern apartments with smart home automation features.</p>
        </div>
        <div className="project-card">
          <img src="https://images.pexels.com/photos/32870/pexels-photo.jpg" alt="IT Park Towers" />
          <h4>IT Park Towers, Hebbal</h4>
          <p>Upcoming commercial hub with offices and co-working spaces.</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <h2>Why Choose Us?</h2>
      <div className="why-choose-us">
        <div className="choose-card">
          <FaBuilding size={35} />
          <h4>Verified Listings</h4>
          <p>We ensure 100% verified projects and properties.</p>
        </div>
        <div className="choose-card">
          <FaHandshake size={35} />
          <h4>End-to-End Support</h4>
          <p>From property visits to loan assistance, we support you throughout.</p>
        </div>
        <div className="choose-card">
          <FaHome size={35} />
          <h4>Personalized Services</h4>
          <p>Our experts recommend properties that match your lifestyle.</p>
        </div>
      </div>

      {/* Contact Prompt */}
      <div className="aboutus-contact">
        <p>📞 Contact us today to explore more about our services and offerings!</p>
      </div>
    </section>
  );
}
