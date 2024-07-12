import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="container nav-main">
        <div className="Logo ">
          <Link className="navbar-brand text-main h1" to="/">
            Admin
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-collapse mt-5 ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className={`nav-item ${selected === "/" ? "act" : ""}`}>
              <Link
                className="nav-link"
                to="/"
                onClick={() => setSelected("/")}
              >
                Dashboard
              </Link>
            </li>
            <li
              className={`nav-item ${
                selected.startsWith("/customers") ? "act" : ""
              }`}
            >
              <Link
                className="nav-link"
                to="/customers"
                onClick={() => setSelected("/customers")}
              >
                Customers
              </Link>
            </li>
            <li
              className={`nav-item ${
                selected.startsWith("/transactions") ? "act" : ""
              }`}
            >
              <Link
                className="nav-link"
                to="/transactions"
                onClick={() => setSelected("/transactions")}
              >
                Transactions
              </Link>
            </li>
            <li
              className={`nav-item ${
                selected.startsWith("/charts") ? "act" : ""
              }`}
            >
              <Link
                className="nav-link"
                to="/charts"
                onClick={() => setSelected("/charts")}
              >
                Charts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
