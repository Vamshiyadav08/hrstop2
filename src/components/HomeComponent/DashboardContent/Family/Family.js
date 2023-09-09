import React, { useEffect, useState, useContext } from "react";
import "./family.css";
import { AttendenceContext } from "../../../../Context";
import { db } from "../../../../firebaseConfig";
import { collection, addDoc, getDocs} from "firebase/firestore";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const familyFields = [
  { label: "Name", name: "name", required: true },
  { label: "Relationship", name: "relationship", required: true },
  { label: "Gender", name: "gender" },
  { label: "Occupation", name: "occupation" },
  { label: "Phone #", name: "phone" },
  { label: "Address", name: "adress", textarea: true },
];

export default function Family() {
  const [state, setStateInput] = useState({
    name: "",
    relationship: "",
    gender: "",
    occupation: "",
    phone: "",
    adress: "",
  });
  const [docsData, setDocsData] = useState([]);

  const [themeval, setthemestate] = useState(localStorage.getItem("themeVal"));
  const { theme } = useContext(AttendenceContext);

  useEffect(() => {
    let themee = localStorage.getItem("themeVal");
    setthemestate(themee);
  }, [theme]);

  const handleInput = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    console.log(name, value);
    setStateInput({
      ...state,
      [name]: value,
    });
  };
  console.log(state);

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (state.name && state.relationship) {
      try {
        await addDoc(collection(db, "family"), {
          name: state.name,
          relationship: state.relationship,
          gender: state.gender,
          occupation: state.occupation,
          gpa: state.phone,
          phone: state.phone,
          adress: state.adress,
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
      const querySnapshot = await getDocs(collection(db, "family"));
      const data = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
        setDocsData(data);
      });
    };
   
    getData()
  return (
    <div>
      <h3>Bank Account Details</h3>
      <form onSubmit={handlesubmit}>
        {familyFields.map((eachFeild) => (
          <div className="bank-input-container" key={eachFeild}>
            <label
              htmlFor=""
              className={`${
                themeval === "true" ? "label-dark" : "family-label"
              }`}
            >
              {eachFeild.name}
              {eachFeild.required && <span className="valid-check">*</span>}
            </label>
            <input
              type="text"
              name={eachFeild.name}
              className="family-input"
              onChange={handleInput}
              placeholder={eachFeild.label}
            />
          </div>
          
        ))}
        <div>
          <button className="family-btn" type="submit" >Add Details</button>
        </div>
      </form>

      <div className="data-container">
        <ul className="data-header-container">
          {familyFields.map((eachFeild, index) => (
            <li className="data-details-header" key={index}>
              {eachFeild.name}
            </li>
          ))}
        </ul>
        {docsData.map((eachItem, index) => (
          <ul key={nanoid()} className="data-content">
            {familyFields.map((eachFeild, index) => (
              <li className="data-details-header" key={index}>
                {eachItem[eachFeild.name]}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
