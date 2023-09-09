import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Common/Topbar/Search/search.css"


export default function PageNotFound() {
    const navigate = useNavigate()
    const handleNavigate=()=>{  
       navigate("/home/profile")
    }
  return (
    <div className='not-found-section'>
        <img  src='https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png' alt='notfound-logo'/>
        <p>Unfortunately the page you are looking for has been moved or deleted</p>
        <button onClick={handleNavigate} className='search-page-button'>Go to Home</button>
    </div>
  )
}
