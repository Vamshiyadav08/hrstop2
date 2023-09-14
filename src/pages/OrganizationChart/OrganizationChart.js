import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import organizationData from "./organizationData.js";
import "./organizationchart.css";

const underVicepresidentArr = [
  { name: "sameer", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "karan", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "banu", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "dinesh", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "madhu", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
];
const underDirectorB = [
  { name: "Revanth", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "Soumya", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "banu", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "Vijayak", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "madhu", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
];
const underDirectorA = [
  { name: "Mansoor", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "vinayak", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "shaymala", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "Vijayak", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
  { name: "radha", role: "Devoloper", time: "fulltime", rmanager: "mansoor" },
];

export default function OrganizationChart() {
  const [clickBoard, setBoard] = useState(false);
  const [clickDirectorA, setDirectorA] = useState(false);
  const [clickDirectorB, setDirectorB] = useState(false);
  const [clickVicePresident, setVicePresident] = useState(false);
  const [clickDeputyMG, setDeputyMG] = useState(false);

  const handleBoard = () => {
    setBoard(!clickBoard);
  };
  const handleDirectorA = () => {
    setDirectorA(!clickDirectorA);
  };
  const handleDirectorB = () => {
    setDirectorB(!clickDirectorB);
  };
  const handleVicePresident = () => {
    setVicePresident(!clickVicePresident);
  };
  const handleDeputyManager = () => {
    setDeputyMG(!clickDeputyMG);
  };
  console.log(clickVicePresident);
  return (
    <div className="organization-container">
    <Tree
      lineWidth={"2px"}
      lineColor={"black"}
      label={
        <span className={`chart-feild`} onClick={handleBoard}>
          <img
            className="node-img"
            src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
            alt=""
          />
          <h3>Board Of Director</h3>
          <p>Director</p>
          <p>Director</p>
          <p>Full Time</p>
        </span>
      }
    >
      <TreeNode>
        <TreeNode
          label={
            <div className="chart-feild" onClick={handleDirectorA}>
              <img
                className="node-img"
                src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                alt=""
              />
              <h3>Akhilesh</h3>
              <p>Director</p>
              <p>Director</p>
              <p>Full Time</p>
            </div>
          }
        >
          { clickDirectorA && (
            <>
              <TreeNode
                label={
                  <div className="chart-feild" onClick={handleVicePresident}>
                    <img
                      className="node-img"
                      src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                      alt=""
                    />
                    <h3>Mansoor</h3>
                    <p>Director</p>
                    <p>Director</p>
                    <p>Full Time</p>
                  </div>
                }
              >
                {organizationData.underVicepresidentArr.map((eachitem, index) => (
                  <TreeNode
                    key={index}
                    className={clickVicePresident ? "" : "hide"}
                  >
                    <div className="chart-feild">
                      <img
                        className="node-img"
                        src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                        alt=""
                      />
                      <h3>{eachitem.name}</h3>
                      <p>{eachitem.role}</p>
                      <p>{eachitem.time}</p>
                      <p>{eachitem.rmanager}</p>
                    </div>
                  </TreeNode>
                ))}
              </TreeNode>
              <TreeNode
                label={
                  <div
                    className="chart-feild"
                    onClick={handleDeputyManager}
                  >
                    <img
                      className="node-img"
                      src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                      alt=""
                    />
                    <h3>Vinayak</h3>
                    <p>Director</p>
                    <p>Director</p>
                    <p>Full Time</p>
                  </div>
                }
              >
                {/* ... Deputy Manager data ... */}
              </TreeNode>
            </>
          )}
        </TreeNode>
        <TreeNode
          label={
            <div className="chart-feild" onClick={handleDirectorB}>
              <img
                className="node-img"
                src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                alt=""
              />
              <h3>Harish Kumar</h3>
              <p>Director</p>
              <p>Director</p>
              <p>Full Time</p>
            </div>
          }
        >
          {clickDirectorB && (
            <>
              {underDirectorB.map((eachitem, index) => (
                <TreeNode
                  key={index}
                  className={clickDirectorB ? "" : "hide"}
                  label={
                    <div className="chart-feild">
                      <img
                      className="node-img"
                      src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                      alt=""
                    />
                    <h3>Vinayak</h3>
                    <p>Director</p>
                    <p>Director</p>
                    <p>Full Time</p>
                    </div>
                  }
                />
              ))}
            </>
          )}
        </TreeNode>
      </TreeNode>
    </Tree>
  </div>
);
}






