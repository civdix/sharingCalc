import React, { useContext, useEffect, useState } from "react";
import CalcContext from "./calcContext/calcContext";
import { FaRupeeSign } from "react-icons/fa";

function ContriToShare() {
  const Username = localStorage.getItem("Username");
  const { share } = useContext(CalcContext);
  const [total, setTotal] = useState(0);
  // Making plotable data
  const [personDetails, setPersonDetails] = useState({});

  function loadData() {
    let totalRupees = 0;
    if (share && share.share) {
      let personData = {};
      share.share.forEach((tranObj) => {
        if (tranObj.author === Username) {
          tranObj.person.forEach((person) => {
            personData[person.Username] = personData[person.Username] || {}; // Initialize the user object if undefined
            personData[person.Username].totalContribution =
              (personData[person.Username].totalContribution || 0) + person.Rs;
            totalRupees += person.Rs;
            personData[person.Username].dpLink = person.Url || "NA";
          });
        }
      });
      setTotal(totalRupees);
      setPersonDetails({ ...personDetails, ...personData });
      console.log(personDetails);
    }
  }

  useEffect(() => {
    loadData();
  }, [share]);

  useEffect(() => {
    console.log(personDetails); // Logs when personDetails updates
  }, [personDetails]);
  return (
    <div className="contributionData">
      <h5>Contribution Status to friends</h5>

      {Object.entries(personDetails).map(([username, details], index) => {
        return (
          <>
            <hr className="lastHr" />
            <div key={username} className={`profile profile-${username}`}>
              <div className="dp">
                {
                  <img
                    src={
                      details.dpLink != "NA"
                        ? `${details.dpLink}`
                        : index % 3 == 2
                        ? require("../resources/Image/ShivamDixit.jpeg")
                        : require("../resources/Image/dummyImage.jpg")
                    }
                  />
                }
              </div>
              <hr className="mx-2" />
              <div className="info">
                <h5>{username}</h5>

                <p className="name">
                  <FaRupeeSign />
                  {details.totalContribution}
                </p>

                <div
                  style={{
                    height: "20px",
                    width: `${parseInt(
                      (details.totalContribution / total) * 100
                    )}%`,
                    backgroundColor: "#76c7c0",
                    textAlign: "center",
                    lineHeight: "20px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  className="contributionLine"
                >
                  {parseInt((details.totalContribution / total) * 100)}%
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ContriToShare;
