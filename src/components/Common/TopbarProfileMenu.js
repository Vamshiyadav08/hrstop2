import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidDownArrow } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./Topbar/topbar.css";
const auth = getAuth();

export default function TopbarProfileMenu({ className }) {
  const [showDropdown, setdropdown] = useState(false);
  const [data, setData] = useState({});

  const handledropdown = () => {
    setdropdown(!showDropdown);
  };
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("./home/profile");
  };
  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        navigate("./login", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div className={className}>
      <div className='profile-topbar-container' onClick={handledropdown}>
        <img
          alt='profile'
          className='profile-topbar-image'
          src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
        />
        <div className='profile-topbar-details'>
          <h4>{data.firstname}</h4>
          <span>{data.role}</span>
        </div>
        <div className='arrow-icon'>
          <BiSolidDownArrow />
        </div>
      </div>
      {showDropdown && (
        <div className='dropdown'>
          <p className='dropdown-item' onClick={navigateToProfile}>
            Profile
          </p>
          <p className='dropdown-item'>Mobile Sessions</p>
          <p className='dropdown-item' onClick={handleLogout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}
