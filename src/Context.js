import { createContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AttendenceContext = createContext([]);

const AttendenceProvider = ({ children }) => {
  const [time, setTime] = useState("");
  const [hamburgerData, setHamburgerData] = useState("");
  const [searchData, setSerachData] = useState([]);
  const [theme,setTheme] = useState(false)
  const navigate = useNavigate("");

  const timeDetails = (timeDetails) => {
    setTime(timeDetails);
  };
  const searchUserData = (userData, searchInput) => {
    let searchedObj = userData.find((eachItem) => {
      return eachItem.name.includes(searchInput);
    });
    setSerachData(searchedObj);

    navigate("/search");
  };

  const hamburgerContext = (btnClick) => {
    setHamburgerData(btnClick);
  };
  const themeContext=((themestate)=>{
      setTheme(themestate)
  })
  // console.log(theme)

  // const cacheMemoData = useMemo(
  //   () => (),
  //   [time, hamburgerData, searchData,theme]
  // );
  

  return (
    <AttendenceContext.Provider value={{
      timeDetails,
      time,
      searchUserData,
      hamburgerContext,
      hamburgerData,
      searchData,
      theme,
      themeContext
    }}>
      {children}
    </AttendenceContext.Provider>
  );
};
export { AttendenceContext, AttendenceProvider };