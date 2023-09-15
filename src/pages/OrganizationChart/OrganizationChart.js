import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import organizationData from "./organizationData.js";
import "./organizationchart.css";



const EmployeeNode = ({ name, role, time, rmanager, onClick }) => (
  <div className="chart-field" onClick={onClick}>
    <img
      className="node-img"
      src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
      alt=""
    />
    <h3>{name}</h3>
    <p>{role}</p>
    <p>{time}</p>
    <p>{rmanager}</p>
  </div>
);

export default function OrganizationChart() {
  const [clickBoard, setBoard] = useState(false);
  const [clickDirectorA, setClickDirectorA] = useState(false);
  const [clickDirectorB, setClickDirectorB] = useState(false);
  const [clickVicePresident, setClickVicePresident] = useState(false);
  const [clickDeputyMG, setDeputyMG] = useState(false);

  const toggleClick = (stateUpdater) => () => {
    stateUpdater((prevState) => !prevState);
  };
console.log(clickVicePresident,clickDirectorA)
  return (
    <div className="organization-container">
      <Tree lineWidth={"2px"} lineColor={"black"} label={<EmployeeNode name="Board Of Director" role="Director" time="Full Time" rmanager="Director" onClick={toggleClick(setClickDirectorA)} />}>
        <TreeNode label={<EmployeeNode name="Akhilesh" role="Director" time="Full Time" rmanager="Director" onClick={toggleClick(setClickDirectorA)} />}>
          {clickDirectorA && (
            <TreeNode>
              {clickDirectorA &&
                organizationData.underDirectorA.map((employee, index) => (
                  <TreeNode key={index} label={<EmployeeNode {...employee} />} onClick={toggleClick(setClickVicePresident)} >
                    {clickVicePresident && (
                      <>
                        {
                          organizationData.underVicepresidentArr.map((employee, vpIndex) => (
                            <TreeNode key={vpIndex} label={<EmployeeNode {...employee} />} />
                          ))}
                      </>
                    )}
                  </TreeNode>
                ))}
            </TreeNode>
          )}
        </TreeNode>

        <TreeNode label={<EmployeeNode name="Harish Kumar" role="Director" time="Full Time" rmanager="Director" onClick={toggleClick(setClickDirectorB)} />}>
          {clickDirectorB &&
            organizationData.underDirectorB.map((employee, index) => (
              <TreeNode key={index} label={<EmployeeNode {...employee} />} />
            ))}
        </TreeNode>
      </Tree>
    </div>
  );
}













