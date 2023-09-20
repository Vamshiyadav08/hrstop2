import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./Documents.css";
import { db } from "../../../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "../Education/education.css";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const documentFields = [
  { label: "Title", name: "title" },
  { label: "Description", name: "description" },
  { label: "Identification", name: "identification" },
  { label: "uploadedby", name: "uploadedby" },
  { label: "status", name: "status" },
];

export default function Documents() {
  const [state, setStateInput] = useState({
    title: "",
    description: "",
    identification: "",
    uploadedby: "",
    status: "",
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
      await addDoc(collection(db, "documents"), state);
      toast.success("Submitted Successfully");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "documents"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setDocsData(data);
    };
    getData();
  }, []);

  return (
    <div className='document-container'>
      <h3 className='document-header'>Documents</h3>
      <form className='doc-form-container' onSubmit={handlesubmit}>
        {documentFields.map((field) => (
          <input
            key={field.name}
            type='text'
            className='documents-input'
            name={field.name}
            onChange={handleInputChange}
            placeholder={field.label}
          />
        ))}
        <input
          type='file'
          className='documents-input'
          name='file'
          onChange={handleInputChange}
          placeholder='Identification'
        />
        <button className='document-btn'>
          <AiOutlineCloudUpload />
          Upload
        </button>
      </form>
      <table className='data-container'>
        <thead>
          <tr>
            {documentFields.map((eachFeild, index) => (
              <th key={nanoid()} className='table-header'>
                {eachFeild.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {docsData.map((eachItem) => (
            <tr key={nanoid()}>
              {documentFields.map((eachFeild) => (
                <td key={nanoid()} className='table-data'>
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
