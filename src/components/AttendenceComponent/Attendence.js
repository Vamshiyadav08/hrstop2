import {
  addDays,
  addWeeks,
  endOfWeek,
  startOfWeek,
  subWeeks,
} from "date-fns";
import React, {  useState } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { MdArrowRight } from "react-icons/md";
import { nanoid } from "nanoid";
import "./attendence.css";

export default function Attendence() {
  const date = new Date();
  let firstDayOfWeek = startOfWeek(date);
  const noWeekDays = 7;
  const [changeToFirstDayOFWeek, setchangeToFirstDayOFWeek] = useState(firstDayOfWeek);


  const nextWeek = () => {
    let nextWeekFirstDay = startOfWeek(addWeeks(changeToFirstDayOFWeek, 1));
    setchangeToFirstDayOFWeek(nextWeekFirstDay);
  };

  const previousweek = () => {
    let previousWeekFirstDay = startOfWeek(subWeeks(changeToFirstDayOFWeek, 1));
    setchangeToFirstDayOFWeek(previousWeekFirstDay);
  };

  const weekDays = Array.from({ length: noWeekDays }).map((_, index) =>{
  return(
    addDays(changeToFirstDayOFWeek, index + 1)
  )});

  return (
    <div className="attendence-container">
      <div className="attendence-header">
        <small>
          Attendence{" "}
          <span>
            <MdArrowRight /> Attendence{" "}
          </span>
        </small>
        <div className="attendenece-btn">
          <button className="attendence-req-btn">Request Attendence</button>
          <button className="attendence-exp-btn">Export</button>
        </div>
      </div>
      <div>
        <p className="attendence-para">
          Justify the attendance on Late, Early Left and Short Total Time for a
          day. You can justify your Late by clicking the Justify option under
          the first punch. You can justify your Early Left by clicking the
          Justify option under your Last punch. You can justify your Short Total
          Time by clicking the Justify option under the Total time. You can also
          request for your missed punch by clicking the Request Punch option.
        </p>
        <div className="attendence-navigators">
          <BiSolidLeftArrow onClick={previousweek} />
          <span>{`${addDays(changeToFirstDayOFWeek, 1).toDateString()}-${addDays(
            endOfWeek(changeToFirstDayOFWeek),
            1
          ).toDateString()}`}</span>
          <BiSolidRightArrow onClick={nextWeek} />
        </div>
      </div>
      <div className="attendence-calender">
        <div>
          <div className="attendence-calender-header">
            <p>Date</p>
            <p>Hours</p>
            <p>Total</p>
          </div>
        </div>
        <div>
          <div className="attendence-dates">
          <ul className="attendence-list-container">
            {weekDays.map((eachDay, index) =>
              (
              
               
                  <li key={nanoid()} className="attendence-list" id={index}>
                    <p>
                    {eachDay.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        weekday: "short",
                      })}
                    </p>
                    <progress value="100" max="100" className={`progress-bar${eachDay.toDateString()===date.toDateString()?"attendece-progress-bar":""}`}></progress>
                    <p>9:20</p>
                  </li>
            ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
