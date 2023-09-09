import React, { useState } from "react";



export default function Admin() {
  const [state, setState] = useState([
    {
      name: "",
      empcode: "",
      email: "",
      dept: "",
      designation: "",
      manager: "",
      date: "",
      phone: "",
    },
  ]);
  const handleChange = (event) => {
    console.log(event.target);

    setState({
      ...state,

      [event.target.name]: event.target.value,
    });
  };
  const handlesubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="admin-container">
      <form onSubmit={handlesubmit}>
        <div>
          <label htmlFor="" className="admin-label">
            name
          </label>
          <input
            name="name"
            type="text"
            className="admin-input"
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <div>
          <label htmlFor="" className="admin-label">
            empcode
          </label>
          <input
            name="empcode"
            type="text"
            className="admin-input"
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <div>
          <label htmlFor="" className="admin-label">
            it
          </label>
          <input
            name="email"
            type="text"
            className="admin-input"
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <div>
          <label htmlFor="" className="admin-label">
            desig
          </label>
          <input
            name="dept"
            type="text"
            className="admin-input"
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <div>
          <label htmlFor="" className="admin-label">
            reporting
          </label>
          <input
            name="designation"
            type="text"
            className="admin-input"
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <div>
          <label htmlFor="" className="admin-label">
            jdate
          </label>
          <input
            name="manager"
            type="text"
            className="admin-input"
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <div>
          <label htmlFor="" className="admin-label">
            phone
          </label>
          <input
            name="phone"
            type="text"
            className="admin-input"
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
}
