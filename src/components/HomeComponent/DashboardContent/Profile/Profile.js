import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";


import "./profile.css";
export default function Profile() {
  const [data, setData] = useState({});
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
    <div className='profile'>
      <div className='profile-header'></div>
      <div className='profile-details-container'>
        <div className='profile-image-section'>
          <img
            alt='profile'
            className='profile-image'
            src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
          />
          <h3>{`${data.firstname} ${data.lastname}`}</h3>
          <h4>{data.role}</h4>
        </div>
        <div>
          <h3>PersonalDetails</h3>

          {data && (
            <div className='profile-details'>
              <label className='profile-label'>Name</label>
              <p>{data.firstname}</p>
              <label className='profile-label'>Email</label>
              <p>{data.personalemail}</p>
              <label className='profile-label'>Phone</label>
              <p>{data.mobile}</p>
              <label className='profile-label'>Address</label>
              <p>{data.adress}</p>
              <label className='profile-label'>Date OF Birth</label>
              <p>{data.date}</p>
              <label className='profile-label'>Linkedin</label>
              <p>{data.linkedin}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
