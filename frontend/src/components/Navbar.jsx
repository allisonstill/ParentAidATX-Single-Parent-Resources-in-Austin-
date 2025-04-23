import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [showVisDropdown, setShowVisDropdown] = useState(false);
  
  const handleVisMenuToggle = () => {
    setShowVisDropdown(!showVisDropdown);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom w-100">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <img
            src="/textLogo.png"
            alt="ParentAidATX Logo"
            style={{ height: "50px" }}
          />
        </Link>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/books" ? "active" : ""
                }`}
                to="/books"
              >
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/housing" ? "active" : ""
                }`}
                to="/housing"
              >
                Housing
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/childcare" ? "active" : ""
                }`}
                to="/childcare"
              >
                Childcare
              </Link>
            </li>
            
            {/* Visualizations Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  location.pathname.includes("/visualization") ? "active" : ""
                }`}
                href="#"
                id="visualizationsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={showVisDropdown}
                onClick={handleVisMenuToggle}
              >
                Visualizations
              </a>
              <ul 
                className={`dropdown-menu ${showVisDropdown ? 'show' : ''}`} 
                aria-labelledby="visualizationsDropdown"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/visualizations"
                    onClick={() => setShowVisDropdown(false)}
                  >
                    ParentAidATX Data
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/developer-visualizations"
                    onClick={() => setShowVisDropdown(false)}
                  >
                    Developer Data
                  </Link>
                </li>
              </ul>
            </li>
            
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/search" ? "active" : ""
                }`}
                to="/search"
              >
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;