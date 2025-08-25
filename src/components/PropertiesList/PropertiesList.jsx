import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./PropertiesList.css";

const properties = [
  { id: 1, title: "Contemporary Apartment", price: "₹45,00,000", beds: 3, baths: 2, area: "1200 Sq Ft", location: "Whitefield, Bangalore", category: "Apartment", description: "A modern 3BHK apartment located in the heart of Whitefield, close to IT hubs and shopping malls.", img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
  { id: 2, title: "Luxury Villa", price: "₹2.5 Cr", beds: 5, baths: 4, area: "3500 Sq Ft", location: "Sarjapur Road, Bangalore", category: "Villa", description: "Spacious villa with landscaped garden, swimming pool, and premium clubhouse access.", img: "https://images.pexels.com/photos/32870/pexels-photo.jpg" },
  { id: 3, title: "Cozy Cottage", price: "₹90,00,000", beds: 2, baths: 1, area: "950 Sq Ft", location: "Indiranagar, Bangalore", category: "Villa", description: "Charming 2BHK cottage surrounded by greenery, ideal for peaceful living.", img: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg" },
  { id: 4, title: "Modern Loft", price: "₹75,00,000", beds: 2, baths: 1, area: "980 Sq Ft", location: "Koramangala, Bangalore", category: "Apartment", description: "Stylish loft apartment located in Koramangala, perfect for young professionals.", img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" },
  { id: 5, title: "Corporate Office Space", price: "₹5 Cr", beds: "-", baths: "-", area: "12,000 Sq Ft", location: "Hebbal, Bangalore", category: "Office", description: "Premium office space with modern amenities and ample parking.", img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" },
  { id: 6, title: "Skyline Penthouse", price: "₹4 Cr", beds: 4, baths: 3, area: "2800 Sq Ft", location: "MG Road, Bangalore", category: "Apartment", description: "Exclusive penthouse with panoramic city views and rooftop lounge.", img: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg" },
  { id: 7, title: "Country Farmhouse", price: "₹1.5 Cr", beds: 5, baths: 2, area: "5000 Sq Ft", location: "Devanahalli, Bangalore", category: "Villa", description: "Rustic farmhouse with spacious land, perfect for weekend getaways.", img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg" },
  { id: 8, title: "Tech Park Tower", price: "₹20 Cr", beds: "-", baths: "-", area: "1,20,000 Sq Ft", location: "Electronic City, Bangalore", category: "Commercial", description: "Grade A office tower suitable for IT companies and startups.", img: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg" },
  { id: 9, title: "Premium Mall Space", price: "₹12 Cr", beds: "-", baths: "-", area: "50,000 Sq Ft", location: "Jayanagar, Bangalore", category: "Commercial", description: "Retail mall space in prime location with top footfall.", img: "https://images.pexels.com/photos/3965522/pexels-photo-3965522.jpeg" },
  { id: 10, title: "Lakeview Apartments", price: "₹1.2 Cr", beds: 3, baths: 2, area: "1500 Sq Ft", location: "Yelahanka, Bangalore", category: "Apartment", description: "Beautiful apartment complex with serene lake views and jogging track.", img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg" },
  { id: 11, title: "Elegant Villa", price: "₹3.2 Cr", beds: 4, baths: 4, area: "4000 Sq Ft", location: "Hennur Road, Bangalore", category: "Villa", description: "Premium villa with luxury interiors and a private pool.", img: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg" },
  { id: 12, title: "Smart Studio Apartment", price: "₹40,00,000", beds: 1, baths: 1, area: "600 Sq Ft", location: "BTM Layout, Bangalore", category: "Apartment", description: "Affordable smart studio with modern amenities.", img: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg" },
  { id: 13, title: "IT Hub Office Space", price: "₹8 Cr", beds: "-", baths: "-", area: "25,000 Sq Ft", location: "Whitefield, Bangalore", category: "Office", description: "Modern IT office building with plug-and-play setup.", img: "https://images.pexels.com/photos/56759/pexels-photo-56759.jpeg" },
  { id: 14, title: "Retail Complex", price: "₹15 Cr", beds: "-", baths: "-", area: "80,000 Sq Ft", location: "Marathahalli, Bangalore", category: "Commercial", description: "Large retail complex ideal for showrooms and outlets.", img: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg" },
  { id: 15, title: "Budget Apartment", price: "₹55,00,000", beds: 2, baths: 1, area: "900 Sq Ft", location: "Banashankari, Bangalore", category: "Apartment", description: "Affordable 2BHK apartment in a well-connected neighborhood.", img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
  { id: 16, title: "Luxury Office Suites", price: "₹10 Cr", beds: "-", baths: "-", area: "30,000 Sq Ft", location: "Manyata Tech Park, Bangalore", category: "Office", description: "Exclusive office suites with premium interiors.", img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" },
  { id: 17, title: "Villa Retreat", price: "₹2 Cr", beds: 4, baths: 3, area: "3000 Sq Ft", location: "Bannerghatta Road, Bangalore", category: "Villa", description: "Villa with eco-friendly design and solar power.", img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" },
  { id: 18, title: "City Center Apartments", price: "₹95,00,000", beds: 2, baths: 2, area: "1100 Sq Ft", location: "Majestic, Bangalore", category: "Apartment", description: "Central apartments with quick access to metro & bus stations.", img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" },
  { id: 19, title: "Tech Park Space", price: "₹18 Cr", beds: "-", baths: "-", area: "1,00,000 Sq Ft", location: "Outer Ring Road, Bangalore", category: "Commercial", description: "Corporate IT tower with world-class facilities.", img: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg" },
  { id: 20, title: "Designer Penthouse", price: "₹3.8 Cr", beds: 3, baths: 3, area: "2600 Sq Ft", location: "Indiranagar, Bangalore", category: "Apartment", description: "Stylish penthouse with modern interiors and rooftop deck.", img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg" },
  { id: 21, title: "Boutique Villa", price: "₹2.3 Cr", beds: 4, baths: 3, area: "3100 Sq Ft", location: "HSR Layout, Bangalore", category: "Villa", description: "Elegant boutique villa with custom interiors and garden.", img: "https://images.pexels.com/photos/32870/pexels-photo.jpg" },
  { id: 22, title: "Corporate Headquarters", price: "₹25 Cr", beds: "-", baths: "-", area: "1,50,000 Sq Ft", location: "Bellandur, Bangalore", category: "Office", description: "Corporate HQ with ample parking and green building certification.", img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" },
  { id: 23, title: "Shopping Arcade", price: "₹7 Cr", beds: "-", baths: "-", area: "20,000 Sq Ft", location: "Basavanagudi, Bangalore", category: "Commercial", description: "Shopping arcade with multiple floors for showrooms and cafes.", img: "https://images.pexels.com/photos/3965522/pexels-photo-3965522.jpeg" },
  { id: 24, title: "Elegant Apartment", price: "₹1.05 Cr", beds: 3, baths: 2, area: "1400 Sq Ft", location: "JP Nagar, Bangalore", category: "Apartment", description: "Beautifully designed apartment with community amenities.", img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
  { id: 25, title: "Startup Office Hub", price: "₹6 Cr", beds: "-", baths: "-", area: "18,000 Sq Ft", location: "Indiranagar, Bangalore", category: "Office", description: "Startup-friendly office hub with co-working and private cabins.", img: "https://images.pexels.com/photos/56759/pexels-photo-56759.jpeg" },

  // Add these to your properties array

// RENTALS START
{
  id: 26,
  title: "Parkside Rental Apartment",
  price: "₹28,000/mo",
  beds: 2,
  baths: 2,
  area: "950 Sq Ft",
  location: "Bannerghatta Road, Bangalore",
  category: "Apartment",
  description: "Modern, semi-furnished apartment in a gated society with kids’ play and pool. Ideal for families and professionals.",
  img: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
  forRent: true
},
{
  id: 27,
  title: "Urban Heights Rental",
  price: "₹36,500/mo",
  beds: 3,
  baths: 2,
  area: "1450 Sq Ft",
  location: "Hebbal, Bangalore",
  category: "Apartment",
  description: "High-rise apartment with balcony, gym, and power backup. Peaceful view and prime access to tech parks.",
  img: "https://images.pexels.com/photos/415314/pexels-photo-415314.jpeg",
  forRent: true
},
{
  id: 28,
  title: "Lakefront Cozy Villa (Rent)",
  price: "₹55,000/mo",
  beds: 4,
  baths: 4,
  area: "2200 Sq Ft",
  location: "Sanktankeri, Bangalore",
  category: "Villa",
  description: "Spacious independent villa facing the lake, with private garden and car park. Long-term rental preferred.",
  img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
  forRent: true
},
{
  id: 29,
  title: "Budget Rental Studio",
  price: "₹15,000/mo",
  beds: 1,
  baths: 1,
  area: "500 Sq Ft",
  location: "Koramangala, Bangalore",
  category: "Apartment",
  description: "Affordable studio featuring high-speed WiFi and proximity to cafes and co-working spaces.",
  img: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
  forRent: true
},
{
  id: 30,
  title: "Family-Friendly Rental House",
  price: "₹43,000/mo",
  beds: 3,
  baths: 3,
  area: "1750 Sq Ft",
  location: "Jayanagar, Bangalore",
  category: "Villa",
  description: "Fully furnished house in a quiet locality. Walking distance to parks, metro station, and top schools.",
  img: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
  forRent: true
},
{
  id: 31,
  title: "Techies’ Rental Apartment",
  price: "₹32,000/mo",
  beds: 2,
  baths: 2,
  area: "1200 Sq Ft",
  location: "Whitefield, Bangalore",
  category: "Apartment",
  description: "Great rental for IT professionals, with clubhouse, open gym, and easy highway connectivity.",
  img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
  forRent: true
},
{
  id: 32,
  title: "Luxury Serviced Rental",
  price: "₹70,000/mo",
  beds: 3,
  baths: 3,
  area: "1800 Sq Ft",
  location: "MG Road, Bangalore",
  category: "Apartment",
  description: "Fully serviced, luxury 3BHK with weekly housekeeping and all furnishings included. Walk to central attractions.",
  img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
  forRent: true
}

];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PropertiesList() {
  const query = useQuery();

  const [filters, setFilters] = useState({
    search: query.get("search") || "",
    location: query.get("location") || "",
    category: query.get("category") || "",
    priceMin: query.get("priceMin") || "",
    priceMax: query.get("priceMax") || "",
    buyOrRent: query.get("buyOrRent") || "buy",
  });

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [message, setMessage] = useState(null); // ✅ unified state for error/success

  const filteredProperties = useMemo(() => {
    let filtered = properties;

    if (filters.buyOrRent === "buy") {
      filtered = filtered.filter((p) => !p.forRent);
    } else {
      filtered = filtered.filter((p) => p.forRent);
    }

    if (filters.location) {
      filtered = filtered.filter(
        (p) =>
          p.location.trim().toLowerCase() ===
          filters.location.trim().toLowerCase()
      );
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.priceMin) {
      const minPrice = parseInt(filters.priceMin, 10);
      filtered = filtered.filter(
        (p) => parseInt(p.price.replace(/[^\d]/g, "")) >= minPrice
      );
    }

    if (filters.priceMax) {
      const maxPrice = parseInt(filters.priceMax, 10);
      filtered = filtered.filter(
        (p) => parseInt(p.price.replace(/[^\d]/g, "")) <= maxPrice
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.location.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [filters]);

  const handleShowDetails = (property) => {
    setSelectedProperty(property);
    setMessage(null);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setMessage(null);
  };

  const handleBook = (property) => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser && loggedInUser !== "null" && loggedInUser !== "undefined") {
      setMessage({
        type: "success",
        text: "✅ Thanks for showing interest! Our agent will contact you soon."
      });
    } else {
      setMessage({
        type: "error",
        text: "⚠️ Please login to book this property."
      });
    }
  };

  return (
    <section className="properties-list">
      <h1>Properties List</h1>

      <div className="properties-results">
        {filteredProperties.length ? (
          filteredProperties.map((p) => (
            <div
              key={p.id}
              className="property-item"
              onClick={() => handleShowDetails(p)}
            >
              <img src={p.img} alt={p.title} />
              <div className="property-info">
                <h3>{p.title}</h3>
                <p>
                  {p.price} {p.forRent ? "/mo" : ""}
                </p>
                <p>{p.location}</p>
                <p>{p.category}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowDetails(p);
                  }}
                >
                  See Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No matching properties.</p>
        )}
      </div>

      {selectedProperty && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProperty.img} alt={selectedProperty.title} />
            <h2>{selectedProperty.title}</h2>
            <p>
              <b>Price:</b> {selectedProperty.price}{" "}
              {selectedProperty.forRent ? "/month" : ""}
            </p>
            <p>
              <b>Location:</b> {selectedProperty.location}
            </p>
            <p>
              <b>Area:</b> {selectedProperty.area}
            </p>
            <p>{selectedProperty.description}</p>

            {/*  Show success or error message */}
            {message && (
              <p className={message.type === "error" ? "error-msg" : "success-msg"}>
                {message.text}
              </p>
            )}

            <div className="button-group">
              <button
                className="book-button"
                onClick={() => handleBook(selectedProperty)}
              >
                Book Property
              </button>
              <button className="close-button" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
