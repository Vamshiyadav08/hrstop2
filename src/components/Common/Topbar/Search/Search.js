import React, { useContext } from "react";
import { AttendenceContext } from "../../../../Context";
import "./search.css";
import { useNavigate } from "react-router-dom/dist";

const labelsAndNames = [
  { label: "", name: "name" },
  { label: "Employee Code", name: "code" },
  { label: "Mobile", name: "mobile" },
  { label: "Designation", name: "Designation" },
  { label: "Joining Date", name: "date" },
  { label: "Email", name: "mail" },
  { label: "Reporting Manager", name: "reporting" },
];

export default function Search() {
  const { searchData } = useContext(AttendenceContext);
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/home/profile");
  };

  return (
    <div className='search-page'>
      {searchData.length > 0 ? (
        <div>
          <h3>Search Employee</h3>
          <div className='search-page-details'>
            <img
              className='search-page-logo'
              src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
              alt='search-profile'
            />
            <div className='search-details-container'>
              {searchData.map((eachItem, itemIndex) => (
                <div key={itemIndex}>
                  <h3 className='search-name-header'>{eachItem.name}</h3>
                  {labelsAndNames.map((item, index) => (
                    <div key={index} className='search-details'>
                      {item.label && (
                        <>
                          <label className='search-profile-label'>
                            {item.label}
                          </label>
                          <p className='search-profile-valu'>
                            {eachItem[item.name]}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='not-found-section'>
          <img
            className='not-found-image'
            alt='not-found-image'
            src='https://img.freepik.com/premium-vector/search-result-find-illustration_585024-17.jpg'
          />
          <div>
            <h3>Please Try with another Employee Name</h3>
            <button className='search-page-button' onClick={handlenavigate}>
              Navigate to home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
