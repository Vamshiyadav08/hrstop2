import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import "./Bank.css";
import "../Education/education.css";
import { db } from "../../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const bankFields = [
  { name: "bankname", label: "Name of Bank", required: true },
  { name: "accno", label: "Account No", required: true },
  { name: "ifsc", label: "IFSC Code" },
  { name: "branch", label: "Branch Address" },
  { name: "acctype", label: "Account Type" },
  { name: "paymentmode", label: "Payment Mode" },
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
        {bankFields.map((eachEle) => (
          <div className='bank-input-container' key={eachEle.name}>
            <label className='bank-label'>
              {eachEle.label}
              {eachEle.required && <span className='valid-check'>*</span>}
            </label>
            <input
              type='text'
              name={eachEle.name}
              className='bank-input'
              onChange={handleInput}
              placeholder={eachEle.label}
            />
          </div>
        ))}
        <button className='bank-btn'>
          <BiEdit />
          Update Details
        </button>
      </form>

      <table className='data-container'>
        <thead>
          <tr>
            {bankFields.map((eachFeild, index) => (
              <th key={nanoid()} className='table-header'>
                {eachFeild.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            <tr>
              {bankFields.map((eachFeild) => (
                <td key={nanoid()} className='table-data'>
                  {docsData[eachFeild.name]}
                </td>
              ))}
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
