import React from "react";
import { Outlet } from "react-router-dom";
import Home from "../../pages/Home/Home";

import "./homelayout.css";

export default function HomeLayout() {
  return (
    <div className="home-layout-container">
      <h3>My Home</h3>
      <div className="home-layout">
        <Home />
        <div className="home-outlet-container">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
