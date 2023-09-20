import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./layout.css";
import Topbar from "../components/Common/Topbar/Topbar";
import Leftbar from "../components/Common/sideBar/SideBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { AttendenceContext } from "../Context";
import { useContext } from "react";
import "../components/Common/Topbar/topbar.css";

export default function LayoutContainer() {
  const navigate = useNavigate();

  const { hamburgerData } = useContext(AttendenceContext);
  const [collapse, setCollapse] = useState(hamburgerData);

  const sideNavRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res === null) {
        navigate("/login", { replace: true });
      }
    });
  }, [navigate]);
  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    // console.log(sideNavRef.current,sideNavRef.current.contains(event.target))
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target) &&
      !event.target.classList.contains("hamburger-btn")
    ) {
      // Clicked outside the side navigation bar, close it
      // Implement your close side navigation bar logic here
      setCollapse(!collapse);
    }
  }

  return (
    <div className='layout-container'>
      <Topbar />
      <div className='layout-components'>
        <div
          className={`${
            hamburgerData ? "active-layout-section" : "hide-layout-section"
          } layout-section`}
          ref={sideNavRef}
        >
          <Leftbar />
        </div>
        <div className='layout-outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
