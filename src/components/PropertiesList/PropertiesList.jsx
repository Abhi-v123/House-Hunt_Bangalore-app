import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  message as antdMessage,
  Spin,
  Rate,
  Pagination,
  Select,
  Empty,
} from "antd";
import { api } from "../../api/api";
import "./PropertiesList.css";

const { Option } = Select;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PropertiesList() {
  const query = useQuery();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [filters, setFilters] = useState({
    search: query.get("search") || "",
    location: query.get("location") || "",
    category: query.get("category") || "",
    priceMin: query.get("priceMin") || "",
    priceMax: query.get("priceMax") || "",
    buyOrRent: query.get("buyOrRent") || "buy",
  });

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [message, setMessage] = useState(null);

  // ✅ FETCH FROM API
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get("/properties");
      setProperties(res.data || []);
    } catch (err) {
      antdMessage.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // ✅ FILTER + SORT LOGIC
  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // buy vs rent
    if (filters.buyOrRent === "buy") {
      filtered = filtered.filter(
        (p) => p.pstatus?.toLowerCase() !== "for rent",
      );
    } else {
      filtered = filtered.filter(
        (p) => p.pstatus?.toLowerCase() === "for rent",
      );
    }

    // location
    if (filters.location) {
      filtered = filtered.filter((p) =>
        p.plocation?.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // category
    if (filters.category) {
      filtered = filtered.filter((p) => p.ptype === filters.category);
    }

    // price min
    if (filters.priceMin) {
      const minPrice = Number(filters.priceMin);
      filtered = filtered.filter((p) => Number(p.p_price) >= minPrice);
    }

    // price max
    if (filters.priceMax) {
      const maxPrice = Number(filters.priceMax);
      filtered = filtered.filter((p) => Number(p.p_price) <= maxPrice);
    }

    // search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.pname?.toLowerCase().includes(searchTerm) ||
          p.plocation?.toLowerCase().includes(searchTerm),
      );
    }

    // ✅ SORTING
    if (sortBy === "priceLow") {
      filtered.sort((a, b) => a.p_price - b.p_price);
    } else if (sortBy === "priceHigh") {
      filtered.sort((a, b) => b.p_price - a.p_price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.prating || 0) - (a.prating || 0));
    }

    return filtered;
  }, [filters, properties, sortBy]);

  // ✅ PAGINATION
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProperties.slice(startIndex, startIndex + pageSize);
  }, [filteredProperties, currentPage]);

  // ✅ HANDLERS
  const handleShowDetails = (property) => {
    setSelectedProperty(property);
    setMessage(null);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setMessage(null);
  };

  const handleBook = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser && loggedInUser !== "null") {
      setMessage({
        type: "success",
        text: "✅ Thanks! Our agent will contact you soon.",
      });
    } else {
      setMessage({
        type: "error",
        text: "⚠️ Please login to book this property.",
      });
    }
  };

  // ✅ LOADING UI
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 120 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="properties-list">
      <h1>Properties List</h1>

      {/* ✅ SORT DROPDOWN */}
      <div style={{ maxWidth: 260, marginBottom: 20 }}>
        <Select
          placeholder="Sort By"
          style={{ width: "100%" }}
          value={sortBy || undefined}
          onChange={setSortBy}
          allowClear
        >
          <Option value="priceLow">Price: Low → High</Option>
          <Option value="priceHigh">Price: High → Low</Option>
          <Option value="rating">Top Rated</Option>
        </Select>
      </div>

      {/* ✅ PROPERTY GRID */}
      <div className="properties-results">
        {paginatedProperties.length ? (
          paginatedProperties.map((p) => (
            <div
              key={p.id}
              className="property-item"
              onClick={() => handleShowDetails(p)}
            >
              <img src={p.pimage} alt={p.pname} />

              <div className="property-info">
                <h3>{p.pname}</h3>

                <Rate
                  disabled
                  allowHalf
                  value={Number(p.prating) || 0}
                  style={{ fontSize: 14 }}
                />

                <p>
                  <b>₹ {Number(p.p_price).toLocaleString()}</b>
                </p>

                <p>{p.plocation}</p>
                <p>{p.ptype}</p>

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
          <Empty description="No matching properties" />
        )}
      </div>

      {/* ✅ PAGINATION */}
      {filteredProperties.length > pageSize && (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProperties.length}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      )}

      {/* ✅ MODAL */}
      {selectedProperty && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProperty.pimage} alt={selectedProperty.pname} />
            <h2>{selectedProperty.pname}</h2>

            <Rate
              disabled
              allowHalf
              value={Number(selectedProperty.prating) || 0}
            />

            <p>
              <b>Price:</b> ₹{" "}
              {Number(selectedProperty.p_price).toLocaleString()}
            </p>

            <p>
              <b>Location:</b> {selectedProperty.plocation}
            </p>

            <p>
              <b>Beds:</b> {selectedProperty.pbeds} | <b>Baths:</b>{" "}
              {selectedProperty.pbaths}
            </p>

            <p>
              <b>Area:</b> {selectedProperty.parea} Sq Ft
            </p>

            <p>{selectedProperty.pdescription}</p>

            {message && (
              <p
                className={
                  message.type === "error" ? "error-msg" : "success-msg"
                }
              >
                {message.text}
              </p>
            )}

            <div className="button-group">
              <button className="book-button" onClick={handleBook}>
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
