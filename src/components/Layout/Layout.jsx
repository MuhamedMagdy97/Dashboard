import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <div className="layout-glass">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
