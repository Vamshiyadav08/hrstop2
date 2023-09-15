import React, { useState, useContext, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, getDocs, doc, collection } from "firebase/firestore";

import "./topbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AttendenceContext } from "../../../Context";
import { getAuth, signOut } from "firebase/auth";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import {AiOutlineMenu} from "react-icons/ai"
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import TopbarProfileMenu from "../../TopbarProfileMenu";

const auth = getAuth();

export default function Topbar() {
  //changing the classname using setisfocused to perform styles
  const [isFocused, setIsFocused] = useState(false);
  const [CheckIn, setCheckIn] = useState(false);
  const [showDropdown, setdropdown] = useState(false);
  const [hamburgerbtn, sethamburgerBtn] = useState(false);
  const [data, setData] = useState({});

  const [theme, setthemeState] = useState(localStorage.getItem("themeVal"));

  const contextData = useContext(AttendenceContext);
  useEffect(() => {
    const setTheme = () => {
      localStorage.setItem("themeVal", theme);
    };
    setTheme();
  }, [theme]);

  const handletheme = (event) => {
    contextData.themeContext(event.target.checked);
    setthemeState(event.target.checked);
  };

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
    console.log(data, "dataa");
  };

  const handleInput = (event) => {
    if (event.key === "Enter") {
      getData(event.target.value);
    }
  };
  useEffect(() => {
    const getDataFromFirebase = async () => {
      try {
        const docRef = doc(db, "userDetails", "id1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let dbData = docSnap.data();
          setData(dbData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromFirebase();
  }, []);
  return (
    <header className='header'>
      <div className='header-logo'>
        <img
          className='topbar-logo'
          src={require("../../../assests/images/hrstop.png")}
          // alt='actualize'
          // onClick={navigateToProfile}
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
            <Toggle icons={false} onChange={handletheme} />
          </label>
        </div>
        <TopbarProfileMenu/>
        {/* <div className='profile-topbar-container'>
          <div>
            <img
              alt='profile'
              className='profile-topbar-image'
              src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
            />
            <div className='profile-topbar-details'>
              <h4>vamshi Thotakuri</h4>
              <span>Associate Share Point Dev</span>
            </div>
            <div className='arrow-icon'>
              <BiSolidDownArrow
                className={`arrow ${showDropdown ? "up" : "down"}`}
                onClick={handledropdown}
              />
            </div>
          </div>
          {showDropdown && (
            <div className='dropdown'>
              <div className='dropdown-item' onClick={navigateToProfile}>
                Profile
              </div>
              <div className='dropdown-item' onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div> */}
        <button className='hamburger-btn' onClick={handlehamburger}>
          <AiOutlineMenu/>
        </button>
      </div>
    </header>
  );
}
