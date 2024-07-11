import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
const [selected, setSelected] = useState(location.pathname)

  return (
    <>
      <nav className="navbar-expand-lg  ">
        <div className="container-nav flex-column ">
          <Link className="navbar-brand text-main h1 " to="/">
            Admin
          </Link>
          <div className="navbar" >
            <ul className="nav flex-column">
              <li className={`nav-item ${selected === "/" ? "act" : "nav-item"}`}>
                <Link className="nav-link "  to="/"  onClick={() => setSelected("/")}>
                  Dashbord
                </Link>
              </li>
              <li className={`nav-item ${selected === "/Customers" ? "act" : "nav-item"}`}>
                <Link className="nav-link" to="/customers"  onClick={() => setSelected("/")}>
                  Customers
                </Link>
              </li>
              <li className={`nav-item ${selected === "/Transactions" ? "act" : "nav-item"}`}>
                <Link className="nav-link"  to="/transactions"  onClick={() => setSelected("/")}>
                  Transactions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
