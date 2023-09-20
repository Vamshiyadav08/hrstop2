import React, { useEffect, useState } from "react";
import "./family.css";
import { db } from "../../../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
  const handleInput = (event) => {
    const { name, value } = event.target;
    setStateInput({
      ...state,
      [name]: value,
    });
  };

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
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "family"));
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
      <h3>Bank Account Details</h3>
      <form onSubmit={handlesubmit}>
        {familyFields.map((eachFeild) => (
          <div className='bank-input-container' key={`eachFeild${nanoid()}`}>
            <label htmlFor='' className='family-label'>
              {eachFeild.label}
              {eachFeild.required && <span className='valid-check'>*</span>}
            </label>
            <input
              type='text'
              name={eachFeild.name}
              className='family-input'
              onChange={handleInput}
              placeholder={eachFeild.label}
            />
          </div>
        ))}
        <div>
          <button className='family-btn' type='submit'>
            Add Details
          </button>
        </div>
      </form>

      <table className='data-container'>
        <thead>
          <tr>
            {familyFields.map((eachFeild, index) => (
              <th key={nanoid()} className='table-header'>
                {eachFeild.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {docsData.map((eachItem) => (
            <tr key={nanoid()}>
              {familyFields.map((eachFeild) => (
                <td className='table-data' key={nanoid()}>
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
