import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./Documents.css";
import { db } from "../../../../firebaseConfig";

import { collection, addDoc, getDocs } from "firebase/firestore";
import "../Education/education.css";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export default function Documents() {
  const [state, setStateInput] = useState({
    title: "",
    description: "",
    identification: "",
  });
  const [docsData, setDocsData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setStateInput({
      ...state,
      [name]: value,
    });
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "documents"), {
        description: state.description,
        identifier: state.identification,
        title: state.title,
      });
      toast.success("Submitted Successfully");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };
  
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "documents"));
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
        setDocsData(data);
      });
    };
    getData();
 

  return (
    <div className="document-container">
      <h3 className="document-header">Documents</h3>
      <form className="doc-form-container" onSubmit={handlesubmit}>
        <div>
          <input
            type="text"
            className="documents-input"
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
          />
          <input
            type="text"
            className="documents-input"
            name="description"
            onChange={handleInputChange}
            placeholder="Description"
          />
          <input
            type="text"
            className="documents-input"
            name="identification"
            onChange={handleInputChange}
            placeholder="Identification"
          />
          <input
            type="file"
            className="documents-input"
            name="file"
            onChange={handleInputChange}
            placeholder="Identification"
          />

          <button className="document-btn">
            <AiOutlineCloudUpload />
            Upload
          </button>
        </div>
      </form>
      <div className="data-container">
        <ul className="data-header-container">
          <li className="data-details-header">Title</li>
          <li className="data-details-header">Description</li>
          <li className="data-details-header">Identification</li>
          <li className="data-details-header">Uploaded By</li>
          <li className="data-details-header">Status</li>
        </ul>

        {docsData.map((eachItem, index) => (
          <ul key={nanoid()} className="data-content">
            <li className="data-details">{eachItem.title}</li>
            <li className="data-details">{eachItem.description}</li>
            <li className="data-details">{eachItem.identification}</li>
            <li className="data-details">Vamshi Thotakuri</li>
            <li className="data-details">Uploaded</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
