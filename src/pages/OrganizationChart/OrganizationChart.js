import React, { useState } from "react";
import "./organizationchart.css"
const underVicepresidentArr = [
  {name:"sameer",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"karan",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"banu",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"dinesh",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"madhu",role:"Devoloper",time:"fulltime",rmanager:"mansoor"}
]
const underDirectorB =[
  {name:"vinayak",role:"DeputyManager",time:"fulltime",rmanager:"mansoor"},
  {name:"Vinayak",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"banu",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"Vijayak",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"madhu",role:"Devoloper",time:"fulltime",rmanager:"mansoor"}
]
const underDirectorA =[
  {name:"Mansoor",role:"VicePresident",time:"fulltime",rmanager:"mansoor"},
  {name:"Mansoor",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"banu",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"Vijayak",role:"Devoloper",time:"fulltime",rmanager:"mansoor"},
  {name:"madhu",role:"Devoloper",time:"fulltime",rmanager:"mansoor"}
]

export default function OrganizationChart() {
  // const [clickBoard,setBoard] =useState(false)
  const [clickDirectorA,setDirectorA] =useState(false)
  const [clickDirectorB,setDirectorB] =useState(false)
  const [clickVicePresident,setVicePresident] = useState(false)
  const [clickDeputyMG,setDeputyMG] = useState(false)


  // const handleBoard=(()=>{
    
  //   setBoard(!clickBoard)
  // })
  const handleDirectorA=(()=>{
    setDirectorA(!clickDirectorA)
  })
  const handleDirectorB=(()=>{
    setDirectorB(!clickDirectorB)
  })
 const handleVicePresident=(()=>{
  console.log("vp")
    setVicePresident(!clickVicePresident)
 })
 const handleDeputyManager=(()=>{
  setDeputyMG(!clickDeputyMG)
 })

  return (
    <div className="organization-container" >
      <table>
        <thead>
          <tr>
            <td>
              <div  className={`node chart-feild`}  >
                <img className="node-img" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="" />
                <h3>Board Of Director</h3>
                <p>Director</p>
                <p>Director</p>
                <p>Full Time</p>
              </div>
            </td>
          </tr>
        </thead>
        <tbody >
            <tr >
              <th className="thead chart-feild">
                  <div onClick={handleDirectorA}>
                    <img className="node-img" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="" />
                    <h3>Akhilesh</h3>
                    <p>Director</p>
                    <p>Director</p>
                    <p>Full Time</p>
                  </div>
                </th>
                <th className="thead chart-feild">
                  <div onClick={handleDirectorB}>
                    <img className="node-img" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="" />
                    <h3>Harish Kumar</h3>
                    <p>Director</p>
                    <p>Director</p>
                    <p>Full Time</p>
                  </div>
                </th>
            </tr>
            <tr>
                <td className={`node ${clickDirectorA?"active":"hide"}`}>
                      {
                        underDirectorA.map((eachitem,index)=>(
                          <div key={index} className={`node chart-feild ${clickDirectorA?"active":"hide"}`} onClick={eachitem.role==="VicePresident"?handleVicePresident:()=>{}}>
                            < >
                              <img className="node-img" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="" />
                              <h3>{eachitem.name}</h3>
                              <p>{eachitem.role}</p>
                              <p>{eachitem.time}</p>
                              <p>{eachitem.rmanager}</p>
                            </>
                          </div>
                        ))
                      }
                </td>
                <td className={`node ${clickDirectorB?"active":"hide"}`}>
                  {
                        underDirectorB.map((eachitem,index)=>(
                          <div key={index} className={`node chart-feild ${clickDirectorB?"active":"hide"}`} >
                            <>
                              <img className="node-img" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="" />
                              <h3>{eachitem.name}</h3>
                              <p>{eachitem.role}</p>
                              <p>{eachitem.time}</p>
                              <p>{eachitem.rmanager}</p>
                            </>
                          </div>
                        ))
                      }
                </td>

            </tr>
            <tr >
              <td className={`node ${clickDirectorA&&clickVicePresident?"active":"hide"}`}>
                        {
                          underVicepresidentArr.map((eachitem,index)=>(
                            <div key={index} className={`node chart-feild `}>
                              < >
                                <img className="node-img" src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" alt="" />
                                <h3>{eachitem.name}</h3>
                                <p>{eachitem.role}</p>
                                <p>{eachitem.time}</p>
                                <p>{eachitem.rmanager}</p>
                              </>
                            </div>
                          ))
                        }
                </td>   
            </tr>    
        </tbody>
      </table>
    </div>
  );
}
