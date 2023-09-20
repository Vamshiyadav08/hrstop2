import React, { useState, useContext, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import "./topbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { AttendenceContext } from "../../../Context";
import Switch from "@mui/material/Switch";
import TopbarProfileMenu from "../TopbarProfileMenu";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [isFocused, setIsFocused] = useState(false);
  const [CheckIn, setCheckIn] = useState(false);
  const [hamburgerbtn, sethamburgerBtn] = useState(false);

  const [theme, setthemeState] = useState(
    localStorage.getItem("themeVal") !== null
      ? localStorage.getItem("themeVal")
      : false
  );

  const contextData = useContext(AttendenceContext);

  useEffect(() => {
    const setTheme = () => {
      localStorage.setItem("themeVal", theme);
    };
    setTheme();
  }, [theme]);

  const handletheme = (event) => {
    console.log(event.target.checked, "event");
    contextData.themeContext(event.target.checked);
    setthemeState(event.target.checked);
  };
  console.log(theme, "theme");

  const [time, setTime] = useState("");
  const handlehamburger = () => {
    sethamburgerBtn(!hamburgerbtn);
    contextData.hamburgerContext(!hamburgerbtn);
  };

  const handleTimeIn = () => {
    const now = new Date();
    let checked = !CheckIn;
    const time = now.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let checkTimeLabel = time === "" && checked === false && "";
    checkTimeLabel = checked ? "Last In : " : "Last Out : ";
    let timeString = checkTimeLabel + time;
    setTime(timeString);
    contextData.timeDetails({
      now,
      checkTimeLabel,
    });
    setCheckIn(checked);
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

  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate("./home/profile");
  };

  return (
    <header className='header'>
      <div className='header-logo'>
        <img
          className='topbar-logo'
          src={require("../../../assests/images/hrstop.png")}
          alt='actualize'
          onClick={navigateToProfile}
        />
      </div>
      <div className='topbar-container'>
        <div>
          <img
            className='topbar-actualize-logo'
            src={require("../../../assests/images/Logo.jpg")}
            alt='actualize'
          />
        </div>
        <div className={`search-container ${isFocused ? "focused" : ""}`}>
          <AiOutlineSearch className='search-icon' />
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type='search'
            className={`search-bar ${isFocused ? "focused" : ""}`}
            name='search'
            placeholder='Search Employee'
            onKeyDown={handleInput}
          />
        </div>
        <div className='topbar-btn-container'>
          <button className='topbar-btn' onClick={handleTimeIn}>
            {CheckIn ? "Time Out" : "Time In"}
          </button>

          <span className='topbar-btn-checkLabel'>{time}</span>
        </div>
        <div>
          <label>
            <Switch
              // checked={theme === true ? true : false}
              onChange={handletheme}
              inputProps={{ "aria-label": "controlled" }}
            />
          </label>
        </div>
        <TopbarProfileMenu className='topbar-profile-menu' />
        <button className='hamburger-btn' onClick={handlehamburger}>
          &#8801;
        </button>
      </div>
    </header>
  );
}
