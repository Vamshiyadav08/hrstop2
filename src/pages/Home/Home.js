import React, { useEffect } from "react";
// on authstatechanged will save the jwt token in webservver on succesfull login
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./home.css";
import HomeDashBoard from "../../components/HomeComponent/HomeDashboard/HomeDashBoard";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res === null) {
        navigate("/login",{replace:true});
      }
    });
  }, [navigate ]);

  return (
    <div >
      <HomeDashBoard />
    </div>
  );
}
