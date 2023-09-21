import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendenceContext = createContext([]);

const AttendenceProvider = ({ children }) => {
  const [time, setTime] = useState("");
  const [hamburgerData, setHamburgerData] = useState("");
  const [searchData, setSerachData] = useState([]);
  const [theme, setTheme] = useState(false);
  const navigate = useNavigate("");

  const timeDetails = (timeDetails) => {
    setTime(timeDetails);
  };
  const searchUserData = (userData, searchInput) => {
    // console.log(userData, "vamshi");
    const lowercaseSearchInput = searchInput.toLowerCase();
    let searchedObj = userData.filter((eachItem) => {
      return eachItem.name.toLowerCase().includes(lowercaseSearchInput);
    });
    setSerachData(searchedObj);

    navigate("/search");
  };
  console.log(searchData);

  const hamburgerContext = (btnClick) => {
    setHamburgerData(btnClick);
  };
  const themeContext = (themestate) => {
    setTheme(themestate);
  };

  return (
    <AttendenceContext.Provider
      value={{
        timeDetails,
        time,
        searchUserData,
        hamburgerContext,
        hamburgerData,
        searchData,
        theme,
        themeContext,
      }}
    >
      {children}
    </AttendenceContext.Provider>
  );
};
export { AttendenceContext, AttendenceProvider };
