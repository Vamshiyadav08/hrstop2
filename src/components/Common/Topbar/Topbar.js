import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import "./topbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AttendenceContext } from "../../../Context";
import { getAuth, signOut } from "firebase/auth";
import "react-toggle/style.css";
import Toggle from 'react-toggle';



const auth = getAuth();

export default function Topbar() {
  //changing the classname using setisfocused to perform styles
  const [isFocused, setIsFocused] = useState(false);
  const [CheckIn, setCheckIn] = useState(false);
  const [showDropdown, setdropdown] = useState(false);
  const [hamburgerbtn, sethamburgerBtn] = useState(false);

  const [theme,setthemeState] =useState(localStorage.getItem("themeVal"))
  const contextData = useContext(AttendenceContext);
  useEffect(()=>{
    const setTheme=(()=>{
    localStorage.setItem("themeVal",theme)
    }
    )
    setTheme()
  },[theme])

  const handletheme=((event)=>{
    // console.log(event.target.checked,"top")
    contextData.themeContext(event.target.checked)
    setthemeState(event.target.checked)
  })

  const [time, setTime] = useState("");
  const handlehamburger = () => {
    sethamburgerBtn(!hamburgerbtn);
    contextData.hamburgerContext(!hamburgerbtn);
  };

  const handleTimeIn = () => {
    const now = new Date();
    let checkTimeLabel;
    const time = now.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let checked = !CheckIn;
    if (time === "" && checked === false) {
      checkTimeLabel = "";
    }

    if (checked) {
      checkTimeLabel = "Last In : ";
    }
    if (checked === false) {
      checkTimeLabel = "Last Out : ";
    }

    let timeString = checkTimeLabel + time;
    setTime(timeString);
    contextData.timeDetails({
      now,
      checkTimeLabel,
    });
    setCheckIn(checked);
  };

  const handledropdown = () => {
    setdropdown(!showDropdown);
  };

  let navigate = useNavigate();
  //navigate to profile
  const navigateToProfile = () => {
    navigate("./home/profile");
  };

  //logout
  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        navigate("./login", { replace: true });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const getData = async (searchedValue) => {
    const querySnapshot = await getDocs(collection(db, "companyusers"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    contextData.searchUserData(data, searchedValue);
  };

  const handleInput = (event) => {
    if (event.key === "Enter") {
      getData(event.target.value);
    }
  };
  return (
    <header className="header">
      <div className="header-logo">
        <img
          className="topbar-logo"
          src={require("../../../assests/images/hrstop.png")}
          alt="actualize"
          onClick={navigateToProfile}
        />
      </div>
      <div className="topbar-container">
        <div>
          <img
            className="topbar-actualize-logo"
            src={require("../../../assests/images/Logo.jpg")}
            alt="actualize"
          />
        </div>
        <div className={`search-container ${isFocused ? "focused" : ""}`}>
          <AiOutlineSearch className="search-icon" />
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type="search"
            className={`search-bar ${isFocused ? "focused" : ""}`}
            name="search"
            placeholder="Search Employee"
            onKeyDown={handleInput}
          />
        </div>
        <div className="topbar-btn-container">
          <button className="topbar-btn" onClick={handleTimeIn}>
            {CheckIn ? "Time Out" : "Time In"}
          </button>

          <span className="topbar-btn-checkLabel">{time}</span>
        </div>
        <div>
          <label>
            <Toggle
            icons={false}
            onChange={handletheme}
           
            />
          </label>
        </div>
        
        <div className="profile-topbar-container">
          <div>
            <img
              alt="profile"
              className="profile-topbar-image"
              src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
            />
            <div className="profile-topbar-details">
              <h4>Vamshi Thotakuri</h4>
              <span>Associate SharePointDeveloper</span>
            </div>
            <div className="arrow-icon">
              <BiSolidDownArrow
                className={`arrow ${showDropdown ? "up" : "down"}`}
                onClick={handledropdown}
              />
            </div>
          </div>
          {showDropdown && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={navigateToProfile}>
                Profile
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
        <button className="hamburger-btn" onClick={handlehamburger}>
          <GiHamburgerMenu />
        </button>
      </div>
    </header>
  );
}
