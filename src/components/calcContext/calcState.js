import { useEffect, useState } from "react";
import CalcContext from "./calcContext";

const CalcState = (props) => {
  const [doCall, setDoCall] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("Username"));
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
  const updateRead = async (notificationId, readerUsername) => {
    try {
      console.log("Come to Update Reads");

      const response = await fetch(
        `http://localhost:5000/api/notification/update/${notificationId}/${readerUsername}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setDoCall(false);
      return true;
    } catch (error) {
      console.log("There is Error");
      throw error;
    }
  };
  const getNotification = async (Username) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notification/getNotification/${Username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json", // Fixed the capitalization
          },
        }
      );

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Notification", json.notification);
      json.notification.forEach((elem) => {
        elem.recipients.forEach((person) => {
          if (person.Username == username) {
            person.read ? setDoCall(false) : setDoCall(true);
          }
        });
      });
      setNotifications(json.notification);
      return json.notification;
    } catch (error) {
      console.error("Error in getting Notification:", error);
      throw error; // Re-throw the error if needed
    }
  };

  const updateShare = async (_id, Username, personUpdatingData) => {
    console.log("In the updateShare with", _id, personUpdatingData);

    try {
      const response = await fetch(
        `http://localhost:5000/api/share/updateShare/${_id}`,
        {
          method: "PUT",
          headers: {
            ShareId: _id,
            Username: Username,
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
    <CalcContext.Provider
      value={{
        share,
        getShare,
        updateShare,
        getNotification,
        updateRead,
        doCall,
        Username: username,
        setUsername,
        notifications,
      }}
    >
      {props.children}{" "}
    </CalcContext.Provider>
  );
};
export default CalcState;
