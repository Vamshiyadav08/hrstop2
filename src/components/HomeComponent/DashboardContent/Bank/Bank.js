import React, { useState, useEffect, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import "./Bank.css";
import "../Education/education.css";
import { db } from "../../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { AttendenceContext } from "../../../../Context";

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
  const [getDatastate, setGetDataState] = useState({});

  const [themeval, setthemestate] = useState(localStorage.getItem("themeVal"));
  const { theme } = useContext(AttendenceContext);

  useEffect(() => {
    let themee = localStorage.getItem("themeVal");
    setthemestate(themee);
  }, [theme]);

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

  const getData = async () => {
    try {
      const docRef = doc(db, "bankDetails", "bankID1");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let dbData = docSnap.data();
        setGetDataState(dbData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  getData();
  return (
    <div>
      <h3>Bank Account Details</h3>
      <form onSubmit={handlesubmit}>
        {formFields.map((eachEle) => (
          <div className="bank-input-container" key={eachEle.name}>
            <label
              className={`${themeval === "true" ? "label-dark" : "bank-label"}`}
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
      <div className="">
        {
          <table className="">
            <th className="">
              {dataHeaders.map((eachEle,index) => (
                <td className="" key={index}>{eachEle}</td>
              ))}
            </th>
            <tr>
              {formFields.map((field) => (
                <td key={field.name}>{getDatastate[field.name]}</td>
              ))}
            </tr>
          </table>
        }
      </div>
    </div>
  );
}
