import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import organizationData from "./organizationData.js";
import "./organizationchart.css";

const EmployeeNode = ({ name, role, time, rmanager, onClick }) => (
  <div className='chart-feild' onClick={onClick}>
    <img
      className='node-img'
      src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
      alt=''
    />
    <h3>{name}</h3>
    <p>{role}</p>
    <p>{time}</p>
    <p>{rmanager}</p>
  </div>
);

export default function OrganizationChart() {
  const [clickedState, setClickedState] = useState({
    DirectorA: false,
    vicepresident: false,
    HrManager: false,
    SystemAdministator: false,
    BussinessDeveloper: false,
    SeniorManager: false,
    DirectorB: false,
  });
  console.log(clickedState.DirectorB);
  const toggleClick = (emprole) => () => {
    setClickedState((prevState) => ({
      ...prevState,
      [emprole]: !prevState[emprole],
    }));
  };

  return (
    <div className='organization-container'>
      <Tree
        lineWidth={"2px"}
        lineColor={"black"}
        label={
          <EmployeeNode
            name='Board Of Director'
            role='Director'
            time='Full Time'
            rmanager='Director'
          />
        }
      >
        <TreeNode
          linestyle={clickedState.DirectorA ? "solid" : "none"}
          label={
            <EmployeeNode
              name='Akhilesh'
              role='Director'
              time='Full Time'
              rmanager='Director'
              onClick={toggleClick("DirectorA")}
            />
          }
        >
          {clickedState.DirectorA && (
            <>
              {clickedState.DirectorA &&
                organizationData.underDirectorA.map((employee, index) => (
                  <TreeNode
                    key={index}
                    label={
                      <EmployeeNode
                        {...employee}
                        onClick={toggleClick(employee.role)}
                      />
                    }
                  >
                    {employee.role === "vicepresident" &&
                      clickedState.vicepresident && (
                        <>
                          {organizationData.underVicepresidentArr.map(
                            (employee, vpIndex) => (
                              <TreeNode
                                key={vpIndex}
                                label={<EmployeeNode {...employee} />}
                              />
                            )
                          )}
                        </>
                      )}
                  </TreeNode>
                ))}
            </>
          )}
        </TreeNode>
        <TreeNode
          label={
            <EmployeeNode
              name='Harish Kumar'
              role='Director'
              time='Full Time'
              rmanager='Director'
              onClick={toggleClick("DirectorB")}
            />
          }
        >
          {clickedState.DirectorB &&
            organizationData.underDirectorB.map((employee, index) => (
              <TreeNode key={index} label={<EmployeeNode {...employee} />} />
            ))}
        </TreeNode>
      </Tree>
    </div>
  );
}
