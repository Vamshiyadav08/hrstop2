import React, { useState, useEffect,useContext } from "react";
import "./education.css";
import { db } from "../../../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { AttendenceContext } from "../../../../Context";

const educationFields = [
  { label: "Degree", name: "name", required: true },
  { label: "Specialization", name: "specialization", required: true },
  { label: "Collage/School", name: "collage" },
  { label: "University", name: "university" },
  { label: "Year of Passing", name: "year" },
  { label: "Percentage", name: "gpa" },
];

export default function Education() {
  const [state, setStateInput] = useState({
    name: "",
    specialization: "",
    collage: "",
    university: "",
    year: "",
    gpa: "",
  });
  const [docsData, setDocsData] = useState([]);

  const [themeval,setthemestate]= useState(localStorage.getItem("themeVal"))
  const {theme} = useContext(AttendenceContext)
  
  useEffect(()=>{
    let themee = localStorage.getItem("themeVal")
    setthemestate(themee)
  },[theme])

  const handleInput = (event) => {
    const { name, value } = event.target;
    setStateInput({
      ...state,
      [name]: value,
    });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (state.name && state.specialization) {
      try {
        await addDoc(collection(db, "education"), {
          name: state.name,
          specialization: state.specialization,
          collage: state.collage,
          university: state.university,
          year: state.year,
          gpa: state.gpa,
        });
        toast.success("submitted succesfully");
      } catch (error) {
        console.error("Error uploading educaton:", error);
      }
    } else {
      toast.error("Enter the Required Details");
    }
  };

  
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "education"));
      const data = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
        setDocsData(data);
      });
    };
    getData();
 

  return (
    <div>
      <h3>Education Details</h3>
      <form onSubmit={handlesubmit}>
        {
          educationFields.map((eachFeild)=>(
            <div className="education-input-container" key={eachFeild.className}>
              <label htmlFor=""className={`${themeval==="true"?"label-dark":"education-label"}`}>
                {eachFeild.label}
                {
                  eachFeild.required&&<span className="valid-check">*</span>
                }
              </label>
              <input
                type="text"
                name={eachFeild.name}
                className="education-input"
                onChange={handleInput}
                placeholder={eachFeild.label}
              />
            </div>

          ))
        }
        <div>
          <button className="family-btn">Add Details</button>
        </div>
      </form>
      <div className="data-container">
        <ul className="data-header-container">
          {
            educationFields.map((eachFeild,index)=>(
              <li className="data-details-header" key={index}>{eachFeild.label}</li>
            ))
          }
        </ul>

        {docsData.map((eachItem, index) => (
          <ul key={nanoid()} className="data-content">
            {
            educationFields.map((eachFeild,index)=>(
              <li className="data-details-header" key={index}>{eachItem[eachFeild.name]}</li>
            ))
          }
          </ul>
        ))}
      </div>
    </div>
  );
}
