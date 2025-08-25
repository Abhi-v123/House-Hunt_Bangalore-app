import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import MainSection from "./components/MainSection/MainSection";
import PropertiesList from "./components/PropertiesList/PropertiesList"; // Your filtered properties list page
import PropertiesCarousel from "./components/PropertiesCarousel/PropertiesCarousel";
import AgentPage from "./components/AgentPage/AgentPage";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AuthModal from "./components/Login/AuthModal";  // Login/signup modal
import AboutUs from "./components/AboutUs/AboutUs";
import { useNavigate } from "react-router-dom";


import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load logged in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openLoginModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const onAuthSuccess = (loggedUser) => {
    setUser(loggedUser);
    closeModal();
    window.location.hash = "#home";
  };

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("loggedInUser");
  setUser(null);
  navigate("/"); // Redirect to homepage route
};



  return (
    <>
      <Navbar user={user} openLogin={openLoginModal} handleLogout={handleLogout} />
      <div className={modalOpen ? "blurred-bg" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainSection id="home" />
                <PropertiesCarousel id="property" />
                <AgentPage id="agency" />
                <AboutUs id="about" />
                <Contact id="contact" />
                <Footer />
              </>
            }
          />
          <Route path="/properties" element={<PropertiesList />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
      {modalOpen && <AuthModal onClose={closeModal} onAuthSuccess={onAuthSuccess} />}
    </>
  );
}

export default App;
