import { ToastContainer } from "react-toastify";
import React, { useContext,useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Attendence from "./components/AttendenceComponent/Attendence";
import LayoutContainer from "./Layout/LayoutContainer";
import Profile from "./components/HomeComponent/DashboardContent/Profile/Profile";
import Details from "./components/HomeComponent/DashboardContent/Details/Details";
import Skills from "./components/HomeComponent/DashboardContent/Skills/Skills";
import Documents from "./components/HomeComponent/DashboardContent/Documents/Documents";
import Education from "./components/HomeComponent/DashboardContent/Education/Education";
import Family from "./components/HomeComponent/DashboardContent/Family/Family";
import OrganizationChart from "./pages/OrganizationChart/OrganizationChart";
import HomeLayout from "./Layout/HomeLayout/HomeLayout";
import Bank from "./components/HomeComponent/DashboardContent/Bank/Bank";
import Admin from "./pages/Admin/Admin";
import PageNotFound from "./components/Common/PageNotFound";
import Search from "./components/Common/Topbar/Search/Search";
import MyCalender from "./pages/Calender/Calender";
import { AttendenceContext } from "./Context";


function App() {
  const [themeval,setthemestate]= useState(localStorage.getItem("themeVal"))
  const {theme} = useContext(AttendenceContext)
  
  useEffect(()=>{
    let themee = localStorage.getItem("themeVal")
    setthemestate(themee)
  },[theme])

 console.log(typeof(themeval))
  

  return (
    <div className={`${themeval==="true"&&"dark-theme"}`}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<LayoutContainer />}>
            <Route index element={<Dashboard />} />
            <Route path="/calender" element={<MyCalender/>}/>
            <Route path="/home" element={<HomeLayout />}>
              <Route path="/home/profile" element={<Profile />} />
              <Route path="/home/details" element={<Details />} />
              <Route path="/home/skills" element={<Skills />} />
              <Route path="/home/documents" element={<Documents />} />
              <Route path="/home/education" element={<Education />} />
              <Route path="/home/family" element={<Family />} />
              <Route path="/home/bank" element={<Bank />} />
            </Route>
            <Route path="/attendence" element={<Attendence />}></Route>
            <Route
              path="/organizationchart"
              element={<OrganizationChart />}
            ></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      {/* </AttendenceProvider> */}
      <ToastContainer />
    </div>
  );
}

export default App;
