import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//importing react tostify  npm library for toast messagess
import { toast } from "react-toastify";
import "./login.css";

export default function LoginComponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // console.log(process.env.REACT_APP_FIREBASE_API_KEY,"process")
  const handleEventChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        // Signed in
        toast.success("You are succesfully signed in");
        console.log("User signed in it");

        navigate("/");
      })
      .catch((error) => {
        toast.error("Enter valid credentials");
      });
  };

  return (
    <div className="login-container">
      <header>
        <img
          src={require("../../assests/images/hrstop.png")}
          className="login-header-img"
          alt="logo"
        />
        <h5>Actualize Consulting Engineers (India) Pvt Ltd</h5>
      </header>
      <main className="auth-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="Email id"
            name="email"
            onChange={handleEventChange}
            value={formData.value}
          />
          <input
            type="password"
            className="login-email"
            placeholder="Password"
            name="password"
            onChange={handleEventChange}
            value={formData.value}
          ></input>
          <button>Sign In</button>
        </form>
        <p className="login-copyrights">&copy; 2023 All rights recieved</p>
      </main>
    </div>
  );
}
