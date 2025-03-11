import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
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
                {" "}
                {/* "Link to" reaplces the traditional "href" attribute. When clicked, changes url to ../books */}
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
