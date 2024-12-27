import React, { useEffect, useState, useContext } from "react";
import * as d3 from "d3";
import "../App.css";
import CalcContext from "./calcContext/calcContext";
export default function LineChart(datasetProp) {
  const [dataset, setDataset] = useState([]);
  let { share } = useContext(CalcContext);
  console.log("from LineChart.jsx", share);

  const [personData, setPersonData] = useState([]);

  const margin = { top: 10, right: 10, bottom: 50, left: 85 };
  const width = 700 - margin.left - margin.right;
  const height = 370 - margin.top - margin.bottom;

  // async function getShares() {
  //   let dataPerson = {};
  //   const response = await fetch(
  //     `http://localhost:5000/api/share/getShares/${localStorage.getItem(
  //       "Username"
  //     )}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     }
  //   );

  // }
  useEffect(() => {
    let datasetTemp = [];
    let dataPerson = {};
    dataPerson = share;
    setPersonData(dataPerson);
    dataPerson &&
      dataPerson.share &&
      dataPerson.share.forEach((element) => {
        let value = 0;
        element.person &&
          element.person.forEach((contributor) => {
            value += contributor.Rs;
          });
        datasetTemp.push({ date: new Date(element.date), value: value });
      });
    setDataset([...dataset, ...datasetTemp]);
    console.log("Running the share useEffect");
  }, [share]); // Fetch data on component mount

  useEffect(() => {
    console.log("Running the Dataset change");

    // Clear existing SVG content to avoid duplicates
    d3.select("#chart-container").select("svg").remove();

    // Create SVG element
    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x = d3
      .scaleTime()
      .range([0, width])
      .domain(d3.extent(dataset, (d) => d.date));
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(dataset, (d) => d.value)]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%b %Y"))
      );

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y));

    // Add the line
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 15) // Position below the x-axis
      .text("Date") // X-axis label text
      .attr("font-size", "15px")
      .attr("fill", "black");

    // Add Y axis label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)") // Rotate for vertical text
      .attr("x", -height / 2) // Position along the Y-axis
      .attr("y", -margin.left + 15) // Adjust spacing from the axis
      .text("Sharing(ALL)") // Y-axis label text
      .attr("font-size", "12px")
      .attr("fill", "black");

    svg
      .append("path")
      .datum(dataset)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Add points (optional)
    svg
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.value))
      .attr("r", 4)
      .attr("fill", "steelblue");
  }, [dataset]); // Re-run D3 logic when dataset changes

  return <div id="chart-container"></div>;
}
