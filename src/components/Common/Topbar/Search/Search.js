import React, { useContext } from 'react';
import { AttendenceContext } from '../../../../Context';
import "./search.css";
import { useNavigate } from 'react-router-dom/dist';

export default function Search() {
  const {searchData,hamburgerData,theme} = useContext(AttendenceContext)
 console.log(hamburgerData,"hamburger")
 console.log(theme,"theme")
  const navigate = useNavigate();
  const handlenavigate=()=>{
    navigate("/home/profile")
  }
  return (
    <div className="search-page">
      {
        searchData?
        <div>
          <h3>Serch Employee</h3>
          <div className="search-page-details">
            <img className="search-page-logo" src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png' alt='search-profile'/>
            <div className='search-details-container'>
              <h3 className='search-name-header'>{searchData.name}</h3>
              <div>
                <label htmlFor="" className="search-profile-label">Employee Code</label>
                <p className="search-profile-valu">{searchData.code}</p>
              </div>
              <div>
                <label htmlFor="" className="search-profile-label">Mobile</label>
                <p className="search-profile-valu">{searchData.mobile}</p>
              </div>
              <div>
                <label htmlFor="" className="search-profile-label">Designation</label>
                <p className="search-profile-valu">{searchData.Designation}</p>
              </div>
              <div>
                <label htmlFor="" className="search-profile-label">Joining Date</label>
                <p className="search-profile-valu">{searchData.date}</p>
              </div>
              <div>
                <label htmlFor="" className="search-profile-label">Email</label>
                <p className="search-profile-valu">{searchData.mail}</p>
              </div>
              <div>
                <label htmlFor="" className="search-profile-label">Reporting Manager</label>
                <p className="search-profile-valu">{searchData.reporting}</p>
              </div>

             
            </div>
          </div>
          
        </div>
        :
        <div className='not-found-section'>
          <h3>Search Employee Not Found</h3>
          <div>
            <h3>Please Try with another keyword</h3>
            <button className='search-page-button' onClick={handlenavigate}>
              Naviagate to home
            </button>
          </div>
        </div>
      }
       
    </div>
  )
}