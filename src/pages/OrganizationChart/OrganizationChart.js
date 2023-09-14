import React, { useState } from "react";
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

const defaultImageURL = "https://example.com/default-image.jpg";

const underVicepresidentArr = [
  { name: "sameer", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "karan", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "banu", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "dinesh", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "madhu", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
];

const underDirectorB = [
  { name: "vinayak", role: "DeputyManager", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "Vinayak", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "banu", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "Vijayak", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "madhu", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
];

const underDirectorA = [
  { name: "Mansoor", role: "VicePresident", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "Mansoor", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "banu", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "Vijayak", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
  { name: "madhu", role: "Developer", time: "fulltime", rmanager: "mansoor", imgSrc: defaultImageURL },
];

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <img src={data.imgSrc} alt={data.name} />
      <h3>{data.name}</h3>
      <p>{data.role}</p>
    </div>
  );
};

const OrganizationChart = () => {
  const [chartData] = useState([
    {
      id: "CEO",
      name: "CEO",
      role: "CEO",
      imgSrc: defaultImageURL,
      children: [
        {
          id: "VP1",
          name: "VP1",
          role: "VP of Sales",
          imgSrc: defaultImageURL,
          children: underVicepresidentArr,
        },
        {
          id: "DirectorB",
          name: "Director B",
          role: "Director",
          imgSrc: defaultImageURL,
          children: underDirectorB,
        },
        {
          id: "DirectorA",
          name: "Director A",
          role: "Director",
          imgSrc: defaultImageURL,
          children: underDirectorA,
        },
      ],
    },
  ]);

  return (
    <div className="organization-container">
      <OrgChart tree={chartData} NodeComponent={CustomNode} />
    </div>
  );
};

export default OrganizationChart;
