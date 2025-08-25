import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainSection.css";

const LOCATIONS = [
  "Whitefield, Bangalore",
  "Sarjapur Road, Bangalore",
  "Indiranagar, Bangalore",
  "Koramangala, Bangalore",
  "Hebbal, Bangalore",
  "MG Road, Bangalore",
  "Devanahalli, Bangalore",
  "Electronic City, Bangalore",
  "Jayanagar, Bangalore",
  "Yelahanka, Bangalore",
  "Hennur Road, Bangalore",
  "BTM Layout, Bangalore",
  "Marathahalli, Bangalore",
  "Banashankari, Bangalore",
  "Manyata Tech Park, Bangalore",
  "Bannerghatta Road, Bangalore",
  "Majestic, Bangalore",
  "Outer Ring Road, Bangalore",
  "HSR Layout, Bangalore",
  "Bellandur, Bangalore",
  "Basavanagudi, Bangalore",
  "JP Nagar, Bangalore",
  "Sanktankeri, Bangalore"
];

export default function MainSection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("buy");
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    priceMin: "",
    priceMax: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.location) params.append("location", filters.location);
    if (filters.category) params.append("category", filters.category);
    if (filters.priceMin) params.append("priceMin", filters.priceMin);
    if (filters.priceMax) params.append("priceMax", filters.priceMax);
    params.append("buyOrRent", selected);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section id="home" className="main-hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Create Lasting Wealth Through Real Estate</h1>
          <p>Amet consectetur adipisicing elit sed do eiusmod.</p>
          <div className="search-container">
            <div className="toggle-buttons">
              <button
                className={selected === "buy" ? "toggle-button active" : "toggle-button"}
                onClick={() => setSelected("buy")}
                type="button"
              >
                Buy
              </button>
              <button
                className={selected === "rent" ? "toggle-button active" : "toggle-button"}
                onClick={() => setSelected("rent")}
                type="button"
              >
                Rent
              </button>
            </div>
            <form className="search-form" onSubmit={handleSubmit}>
              <select
                aria-label="Select location"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
              >
                <option value="">Select Location</option>
                {LOCATIONS.map((loc) => (
                  <option value={loc} key={loc}>{loc}</option>
                ))}
              </select>
              <select
                aria-label="Select property type"
                name="category"
                value={filters.category}
                onChange={handleInputChange}
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Office">Office</option>
              </select>
              <input
                type="number"
                name="priceMin"
                placeholder="Min Price"
                aria-label="Minimum price"
                value={filters.priceMin}
                onChange={handleInputChange}
                min="0"
              />
              <input
                type="number"
                name="priceMax"
                placeholder="Max Price"
                aria-label="Maximum price"
                value={filters.priceMax}
                onChange={handleInputChange}
                min="0"
              />
              <button type="submit" className="search-button">Search</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
