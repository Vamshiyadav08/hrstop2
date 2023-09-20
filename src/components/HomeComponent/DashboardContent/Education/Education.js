import React, { useState, useEffect} from "react";
import "./education.css";
import { db } from "../../../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

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

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "education"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
        setDocsData(data);
      });
    };
    getData();
  }, []);

  return (
    <div>
      <h3>Education Details</h3>
      <form onSubmit={handlesubmit}>
        {educationFields.map((eachFeild, index) => (
          <div className='education-input-container' key={index}>
            <label htmlFor='' className='education-label'>
              {eachFeild.label}
              {eachFeild.required && <span className='valid-check'>*</span>}
            </label>
            <input
              type='text'
              name={eachFeild.name}
              className='education-input'
              onChange={handleInput}
              placeholder={eachFeild.label}
            />
          </div>
        ))}
        <div>
          <button className='family-btn'>Add Details</button>
        </div>
      </form>

      <table className='data-container'>
        <thead>
          <tr>
            {educationFields.map((eachFeild, index) => (
              <th key={nanoid()} className='table-header'>
                {eachFeild.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {docsData.map((eachItem) => (
            <tr key={nanoid()}>
              {educationFields.map((eachFeild, index) => (
                <td key={index} className='table-data'>
                  {eachItem[eachFeild.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
