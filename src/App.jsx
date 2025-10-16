import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import MainSection from "./components/MainSection/MainSection";
import PropertiesList from "./components/PropertiesList/PropertiesList"; 
import PropertiesCarousel from "./components/PropertiesCarousel/PropertiesCarousel";
import AgentPage from "./components/AgentPage/AgentPage";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AuthModal from "./components/Login/AuthModal";
import AboutUs from "./components/AboutUs/AboutUs";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    navigate("/"); // go to homepage after login
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/"); // Redirect to homepage
  };

  return (
    <>
      <Navbar user={user} openLogin={openLoginModal} handleLogout={handleLogout} />
      <div className={modalOpen ? "blurred-bg" : ""}>
        <Routes>
          {/* Homepage route */}
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

          {/* Properties Page */}
          <Route path="/properties" element={<PropertiesList />} />

          {/* Catch-all 404 route */}
          <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>Page Not Found</h2>} />
        </Routes>
      </div>

      {modalOpen && <AuthModal onClose={closeModal} onAuthSuccess={onAuthSuccess} />}
    </>
  );
}

export default App;
