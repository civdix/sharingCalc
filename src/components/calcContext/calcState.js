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

  const updateShare = async (_id, personUpdatingData) => {
    console.log("In the updateShare with", _id, personUpdatingData);

    try {
      const response = await fetch(
        `http://localhost:5000/api/share/updateShare/${_id}`,
        {
          method: "PUT",
          headers: {
            ShareId: _id,
            "Content-type": "application/json",
          },
          body: JSON.stringify(personUpdatingData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! status:${response.status}`);
      }
    } catch (e) {
      console.log("ERRor");
    }
  };
  // Will gonna add addShare
  // createUser
  // other option toooooooo
  const getUser = async (Username) => {
    const data = fetch("https:/localhost:5000/getData/:Username");
  };
  return (
    <CalcContext.Provider value={{ share, getShare, updateShare }}>
      {props.children}{" "}
    </CalcContext.Provider>
  );
};
export default CalcState;
