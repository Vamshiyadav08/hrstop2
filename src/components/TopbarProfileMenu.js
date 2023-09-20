import React,{useState} from 'react';
import {  useNavigate } from "react-router-dom";
import { BiSolidDownArrow } from "react-icons/bi";

import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

export default function TopbarProfileMenu() {
  const [showDropdown, setdropdown] = useState(false);
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
        console.log(error);
      });
  };
  return (
    
      <div className='profile-topbar-container'>
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
        </div>

  )
}
