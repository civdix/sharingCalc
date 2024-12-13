import React, { useState } from "react";
import LineChart from "./lineChart";
import * as d3 from "d3";
// Will have a Available Settlements Where if i eat on ctri of 10Rs from sahil author and some day i today make A Share wher sahil contri is 10Rs so it will be Settlement Possible so remaiining amount would be either zero or dept or credit
function Analytics() {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

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
            <h3> $32,546</h3>
            <span className="bg-success rounded p-1">↓ 12.7% </span>{" "}
            <span> Compared to last month</span>
          </div>
          <div className="TotalDept rounded mx-1">
            <span className="text-secondary">Total Spend</span>
            <h3 className="text-danger">$13,433</h3>
            <span className="bg-success rounded p-1">↓ 12.7% </span>{" "}
            <span> Compared to last month</span>
          </div>
          <div className="TotalUpcoming rounded mx-1">
            {" "}
            <span className="text-secondary">Upcoming Money</span>
            <h3 className="text-success">$25,455</h3>
            <span className="bg-warning rounded p-1">↓ 12.7% </span>{" "}
            <span className="fs-6"> Compared to last month</span>
          </div>
        </div>
        <div className="deptByNameForMe">
          {/* D3 Code */}
          <h1>Hello</h1>
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
