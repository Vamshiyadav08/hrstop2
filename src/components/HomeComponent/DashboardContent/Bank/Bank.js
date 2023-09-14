import React, { useState, useEffect, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import "./Bank.css";
import "../Education/education.css";
import { db } from "../../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { AttendenceContext } from "../../../../Context";
import { nanoid } from "nanoid";

const formFields = [
  { name: "bankname", label: "Name of Bank", required: true },
  { name: "accno", label: "Account No", required: true },
  { name: "ifsc", label: "IFSC Code" },
  { name: "branch", label: "Branch Address" },
  { name: "acctype", label: "Account Type" },
  { name: "paymentmode", label: "Payment Mode" },
];
const dataHeaders = [
  "Name of Bank",
  "Account No",
  "IFSC No",
  "Branch Address",
  "Account Type",
  "Payment Mode",
];

export default function Bank() {
  const [inputstate, setStateInput] = useState({
    bankname: "",
    accno: "",
    ifsc: "",
    branch: "",
    acctype: "",
    paymentmode: "",
  });
  const [docsData, setDocsData] = useState({});

  // const [themeval, setthemestate] = useState(localStorage.getItem("themeVal"));
  // const { theme } = useContext(AttendenceContext);

  // useEffect(() => {
  //   let themee = localStorage.getItem("themeVal");
  //   setthemestate(themee);
  // }, [theme]);

  const handleInput = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setStateInput({
      ...inputstate,
      [name]: value,
    });
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (inputstate.accno && inputstate.bankname) {
      try {
        await setDoc(doc(db, "bankDetails", "bankID1"), inputstate);
        console.log("Added");
        toast.success("Updated Successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Enter Required Feilds");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "bankDetails", "bankID1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let dbData = docSnap.data();
          setDocsData(dbData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <h3>Bank Account Details</h3>
      <form onSubmit={handlesubmit}>
        {formFields.map((eachEle) => (
          <div className="bank-input-container" key={eachEle.name}>
            <label
              className= "bank-label"
            >
              {eachEle.label}
              {eachEle.required && <span className="valid-check">*</span>}
            </label>
            <input
              type="text"
              name={eachEle.name}
              className="bank-input"
              onChange={handleInput}
              placeholder={eachEle.label}
            />
          </div>
        ))}
        <button className="bank-btn">
          <BiEdit />
          Update Details
        </button>
      </form>
      <div className="data-container">
        <ul className="data-header-container">
          {dataHeaders.map((eachEle) => (
            <li className="data-details-header" key={nanoid()}>
              {eachEle}
            </li>
          ))}
        </ul>

        <ul className="data-content">
          {formFields.map((eachItem, index) => (
            <li className="data-details" key={index}>
              {docsData[eachItem.name]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
