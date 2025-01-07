import React, { useEffect, useState, useContext } from "react";
import { FaDotCircle } from "react-icons/fa";
import CalcContext from "./calcContext/calcContext";
import { CiRead, CiUnread } from "react-icons/ci";

function Notification() {
  const { notifications, getNotification } = useContext(CalcContext);
  // const [, setNotifications] = useState([]);
  const Username = localStorage.getItem("Username") || "guest";

  useEffect(() => {
    const fetchNotifications = async () => {
      await getNotification(Username);
      // Fallback to empty array
    };
    fetchNotifications();
  }, []);

  return (
    <div
      className="dropdown-menu text-start  Notification"
      aria-labelledby="navbarDropdown"
    >
      {notifications
        .slice()
        .reverse()
        .map((notification, index) => (
          <div key={index}>
            <div className="dropdown-item">
              <h5>
                By:{" "}
                {notification.author === Username ? "You" : notification.author}{" "}
                <FaDotCircle
                  color={
                    notification.type === "info"
                      ? "green"
                      : notification.type === "alert"
                      ? "red"
                      : "grey"
                  }
                />
              </h5>
              <p>{notification.message}</p>
              <div className="container overflow-hidden">
                <div className="notificationPartnerSliding py-1  border border-primary">
                  {notification.recipients.map((recipient, index) => {
                    return (
                      <div
                        className=" notificationPartner "
                        key={recipient.userId || index}
                      >
                        <div className=" border bg-light">
                          {recipient.Username}{" "}
                          {recipient.read ? <CiRead /> : <CiUnread />}
                        </div>
                        <span>{recipient.read ? recipient.readAt : ""}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="dropdown-divider border border-warning "></div>
          </div>
        ))}
    </div>
  );
}

export default Notification;
