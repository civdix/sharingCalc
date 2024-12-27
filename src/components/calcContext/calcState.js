import { useEffect, useState } from "react";
import CalcContext from "./calcContext";
const CalcState = (props) => {
  // There getShare method Not Working
  const [share, setShare] = useState({});
  const getShare = async (Username) => {
    try {
      // console.log("Username is: ",Username,"Error in Get Share")

      const response = await fetch(
        `http://localhost:5000/api/share/getShares/${Username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
      const shares = await response.json();
      setShare(shares);
      console.log("Shares are", shares);
      return shares;
    } catch (error) {
      console.log("Error from getShare: ", error);
    }
  };

  // Will gonna add addShare
  // createUser
  // other option toooooooo

  return (
    <CalcContext.Provider value={{ share, getShare }}>
      {props.children}{" "}
    </CalcContext.Provider>
  );
};
export default CalcState;
