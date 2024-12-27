import React, { useState, useEffect, useContext } from "react";
import CalcContext from "./calcContext/calcContext";
import LineChart from "./lineChart";
import * as d3 from "d3";
// Will have a Available Settlements Where if i eat on ctri of 10Rs from sahil author and some day i today make A Share wher sahil contri is 10Rs so it will be Settlement Possible so remaiining amount would be either zero or dept or credit
function Analytics() {
  const [spends, setSpends] = useState({
    "Total Spend": 0,
    "Total Debt": 0,
    "Total Upcoming": 0,
  });
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));
  let { getShare } = useContext(CalcContext);
  const handleLoadData = async (params) => {
    let Username = localStorage.getItem("Username");

    let val = await getShare(Username);

    let totalSpendOnOthers = 0;
    let totalSelf = 0;
    // const records = share;
    val.share.forEach((elem) => {
      elem.person.forEach((person) => {
        if (elem.author == Username) {
          if (
            person.Username == Username ||
            person.Username.toLowerCase() == "self"
          ) {
            totalSelf += person.Rs;
          } else {
            totalSpendOnOthers += person.Rs;
          }
        } else if (person.Username == Username) {
        }
        // No Piad or unpaid undicator so can not make the Total Upcoming feature Now
      });
    });
    setSpends({
      "Total Spend": totalSpendOnOthers + totalSelf,
      "Total Debt": 0,
      "Total Upcoming": totalSpendOnOthers,
    });
    console.log(val);
  };
  useEffect(() => {
    handleLoadData();
  }, []);
  return (
    <div
      className="mx-auto d-flex justify-content-between"
      style={{ width: "100%", backgroundColor: "transparent" }}
    >
      <div className="firstHalf" style={{ width: "80%" }}>
        <div className="OverviewInNumbers d-flex p-2 justify-content-around">
          {/* Make a UseContext and save the totalSpend wagera things in that context */}
          <div className="TotalSpend rounded mx-1">
            <span className="text-secondary">Total Spend</span>
            <h3>{spends["Total Spend"]} </h3>
            <span className="bg-success rounded p-1">↓ 12.7% </span>{" "}
            <span> Compared to last month</span>
          </div>
          <div className="TotalDept rounded mx-1">
            <span className="text-secondary">Total Dept</span>
            <h3 className="text-danger">{spends["Total Debt"]}</h3>
            <span className="bg-success rounded p-1">↓ 12.7% </span>{" "}
            <span> Compared to last month</span>
          </div>
          <div className="TotalUpcoming rounded mx-1">
            {" "}
            <span className="text-secondary">Upcoming Money</span>
            <h3 className="text-success">{spends["Total Upcoming"]}</h3>
            <span className="bg-warning rounded p-1">↓ 12.7% </span>{" "}
            <span className="fs-6"> Compared to last month</span>
          </div>
        </div>
        <div className="deptByNameForMe">
          {/* D3 Code */}
          <LineChart />
        </div>
        {/* <div className="dreamSection">
        {/* There will be Dreams where user can put money and will have accumulation at bank and analysis at here }
        </div> */}
        <div className="Settlements"></div>
        <div className="Suggestion"></div>
        <div className="FriendShipQuoates"></div>
      </div>
      <div className="secondHalf" style={{ width: "20%" }}>
        <div className="SpendsPieAccToCategory bg-white p-2">
          <img
            className="w-100"
            src={require("../resources/Image/PieChart.png")}
            alt="pierChart"
          />
        </div>
        <div>
          <img
            className="my-1"
            src={require("../resources/Image/horizontalPercentageOutOf.png")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
