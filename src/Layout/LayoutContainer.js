import React, { useEffect } from "react";
import { Outlet,useNavigate} from "react-router-dom";
import "./layout.css";
import Topbar from "../components/Common/Topbar/Topbar";
import Leftbar from "../components/Common/LeftBar/Leftbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LayoutContainer() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res === null) {
        navigate("/login", { replace: true });
      }
    });
  }, [navigate]);
  return (
    <div className="layout-container">
      <Topbar />
      <div className="layout-components">
        <div className="layout-section">
          <Leftbar />
        </div>
        <div className="layout-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
