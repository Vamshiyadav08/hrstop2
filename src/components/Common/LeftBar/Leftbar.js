import React, { useContext, useState, useEffect } from "react";
import { AiFillDashboard, AiFillCreditCard, AiFillHome } from "react-icons/ai";
import { BsFillAlarmFill, BsHourglassSplit, BsCash } from "react-icons/bs";
import {
  FaUserShield,
  FaBook,
  FaUsers,
  FaCubes,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { BiHistory, BiEdit } from "react-icons/bi";
import { AttendenceContext } from "../../../Context";
import "../Topbar/topbar.css";
import "./leftbar.css";

const navItems = [
  { id: "home", label: "My Home", icon: <AiFillHome /> },
  { id: "attendence", label: "Attendance", icon: <BsFillAlarmFill /> },
  { id: "calender", label: "Calendar", icon: <SlCalender /> },
  { id: "organizationchart", label: "Organizational Chart", icon: <FaUsers /> },
  { id: "dashboard", label: "DashBoard", icon: <AiFillDashboard /> },
  { id: "leaves", label: "Leaves", icon: <FaUserShield /> },
  { id: "expence", label: "Expense", icon: <AiFillCreditCard /> },
  { id: "compensation", label: "Compensation", icon: <BsCash /> },
  { id: "assets", label: "Assets", icon: <FaCubes /> },
  { id: "timesheet", label: "Time Sheet", icon: <SlCalender /> },
  { id: "letsarchieve", label: "Lets Archive", icon: <BsHourglassSplit /> },
  { id: "training", label: "Training", icon: <FaChalkboardTeacher /> },
  { id: "forms", label: "Forms", icon: <BiEdit /> },
  { id: "policies", label: "Policies", icon: <FaBook /> },
  { id: "History", label: "History", icon: <BiHistory /> },
  { id: "admin", label: "Admin", icon: <BiHistory /> },
];

export default function Leftbar() {
  const [activeTab, setActiveTab] = useState(null);

  const [themeval, setthemestate] = useState(localStorage.getItem("themeVal"));
  const { hamburgerData, theme } = useContext(AttendenceContext);

  useEffect(() => {
    let themee = localStorage.getItem("themeVal");
    setthemestate(themee);
  }, [theme]);
  

  const handleBtn = (clickedElement) => {
    console.log("clicked");
    setActiveTab(clickedElement);
  };

  return (
    <aside
      className={`${"aside-container"} ${
        hamburgerData ? "aside-container-active" : "aside-container-hide"
      }`}
    >
      <nav className="aside-nav">
        <ul>
          {navItems.map((eachItem) => (
            <li
              key={eachItem.id}
              className={`${themeval === "true" ? "dark-theme-nav" :"aside-nav-list" }${
                activeTab === eachItem.id ? "active-tab" : ""
              }`}
            >
              <Link
                to={
                  eachItem.id === "dashboard"
                    ? "/"
                    : eachItem.id === "home"
                    ? "home/profile"
                    : eachItem.id
                }
                className="aside-nav-link"
                onClick={() => handleBtn(eachItem.id)}
              >
                <span className="aside-nav-icon">{eachItem.icon}</span>
                {eachItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
