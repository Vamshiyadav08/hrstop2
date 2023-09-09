import React, { useContext, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./details.css";
import { db } from "../../../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { AttendenceContext } from "../../../../Context";

const personalDetailsFields = [
  {
    name: "title",
    label: "Title",
    type: "select",
    options: ["Mr", "Miss", "Dr"],
  },
  { name: "firstname", label: "First Name", type: "text", required: true },
  { name: "middlename", label: "Middle Name", type: "text" },
  { name: "lastname", label: "Last Name", type: "text", required: true },
  { name: "date", label: "Date of Birth", type: "date" },
  { name: "role", label: "Role", type: "text" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Transgender"],
  },
  {
    name: "bloodgroup",
    label: "Blood Group",
    type: "select",
    options: ["A+", "B+", "AB+"],
  },
  {
    name: "religion",
    label: "Religion",
    type: "select",
    options: ["Hindu", "Muslim", "Christian", "Sikh"],
  },
  {
    name: "martialstatus",
    label: "Marital Status",
    type: "select",
    options: ["Single", "Married", "Widowed"],
  },
];

const contactDetailsFields = [
  { name: "mobile", label: "Mobile", required: true },
  { name: "workphone", label: "Work Phone" },
  { name: "personalemail", label: "Personal Email",type:"text", required: true },
  { name: "linkedin", label: "LinkedIn",type:"text" },
  { name: "adress", label: "Permanent Address",type:"text" },
];

export default function Details() {
  const [data, setData] = useState({
    title: "",
    firstname: "",
    lastname: "",
    date: "",
    gender: "",
    bloodgroup: "",
    religion: "",
    martialstatus: "",
    mobile: "",
    workphone: "",
    personalemail: "",
    linkedin: "",
    adress: "",
    role: "",
  });
  const [themeval, setthemestate] = useState(localStorage.getItem("themeVal"));
  const { theme } = useContext(AttendenceContext);

  useEffect(() => {
    let themee = localStorage.getItem("themeVal");
    setthemestate(themee);
  }, [theme]);

  const handleChangeEvent = (event, val) => {
    console.log(val);
    console.log(event.target.value);
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.name !== "" && data.personalemail !== "" && data.mobile !== "") {
      try {
        await setDoc(doc(db, "userDetails", "id1"), data);
        console.log("Added");
        toast.success("Form Details Submitted");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Enter the Required Feilds");
    }
  };

  useEffect(() => {
    const getDataFromFirebase = async () => {
      try {
        const docRef = doc(db, "userDetails", "id1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let dbData = docSnap.data();
          setData(dbData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDataFromFirebase();
  }, []);
  const renderInputFeild = (eachFeild) => {
    if (eachFeild.type === "select") {
      return (
        <select
          id={eachFeild.name}
          name={eachFeild.name}
          onChange={handleChangeEvent}
          className="form-input"
        >
          {eachFeild.options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (eachFeild.type === "textarea") {
      return (
        <textarea
          rows="5"
          cols="20"
          name={eachFeild.name}
          onChange={handleChangeEvent}
          className="form-input"
          value={data[eachFeild.name]}
        />
      );
    } else if (eachFeild.name === "mobile" || eachFeild.name === "workphone") {
      return (
        <div className="form-input">
          <PhoneInput
            inputProps={{
              name: eachFeild.name,
            }}
            country={"us"}
            name={eachFeild.name}
            value={data[eachFeild.name]}
            onChange={(value) =>
              handleChangeEvent({ target: { name: eachFeild.name, value } })
            }
          />
        </div>
      );
    } else if (eachFeild.type === "text") {
      return (
        <input
          name={eachFeild.name}
          id={eachFeild.name}
          type="text"
          onChange={handleChangeEvent}
          className="form-input"
          value={data?.[eachFeild.name]}
        />
      );
    }else if(eachFeild.type==="date"){
      return(
        <input
          name={eachFeild.name}
          id={eachFeild.name}
          type="date"
          onChange={handleChangeEvent}
          className="form-input"
          value={data?.[eachFeild.name]}
        />
      )

    }
  };

  return (
    <div className="details-container">
      <form onSubmit={handleSubmit}>
        <div className="personal-details">
          <h4 className="details-heading">Personal Details</h4>
          {personalDetailsFields.map((eachFeild) => (
            <div className="input-container" key={eachFeild.name}>
              <label
                className={`${
                  themeval === "true" ? "label-dark" : "details-label"
                }`}
                htmlFor="middleName"
              >
                {eachFeild.label}
                {eachFeild.required && (
                  <span className="star-important">*</span>
                )}
              </label>
              {renderInputFeild(eachFeild)}
            </div>
          ))}
        </div>
        <div className="contact-details">
          <h4 className="details-heading">Contact Details</h4>
          {contactDetailsFields.map((eachFeild) => (
            <div className="input-container" key={eachFeild.name}>
              <label
                className={`${
                  themeval === "true" ? "label-dark" : "details-label"
                }`}
              >
                {eachFeild.label}
              </label>
              {renderInputFeild(eachFeild)}
            </div>
          ))}
        </div>
        {data.length < 1 ? (
          <button className="details-btn">Save</button>
        ) : (
          <button className="details-btn">Update</button>
        )}
      </form>
    </div>
  );
}
