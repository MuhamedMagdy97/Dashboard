import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname); // Update selected state when location changes
  }, [location.pathname]);

  return (
    <nav className="navbar-expand-lg">
      <div className="container-nav flex-column">
        <Link className="navbar-brand text-main h1" to="/">
          Admin
        </Link>
        <div className="navbar">
          <ul className="nav flex-column">
            <li className={`nav-item ${selected === "/" ? "act" : ""}`}>
              <Link className="nav-link" to="/" onClick={() => setSelected("/")}>
                Dashboard
              </Link>
            </li>
            <li className={`nav-item ${selected.startsWith("/customers") ? "act" : ""}`}>
              <Link className="nav-link" to="/customers" onClick={() => setSelected("/customers")}>
                Customers
              </Link>
            </li>
            <li className={`nav-item ${selected.startsWith("/transactions") ? "act" : ""}`}>
              <Link className="nav-link" to="/transactions" onClick={() => setSelected("/transactions")}>
                Transactions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
