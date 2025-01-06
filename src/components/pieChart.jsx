import React, { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CalcContext from "./calcContext/calcContext";
const PieChart = ({ data = [], width = 260, height = 300 }) => {
  const { share } = useContext(CalcContext);
  const [myTagsWithKharcha, setMyTagsWithKharcha] = useState([]);

  useEffect(() => {
    if (share && share.share) {
      let myTagsWithKharchaTemp = [];

      // Loop through each element in share.share
      share.share.forEach((element) => {
        let total = 0;

        // Calculate the sum of Rs for each transaction
        element.person.forEach((person) => {
          total += person.Rs;
        });

        // Assign the total value to each tag
        element.tag.forEach((tag) => {
          myTagsWithKharchaTemp.push({ name: tag, value: total });
        });
      });

      setMyTagsWithKharcha(myTagsWithKharchaTemp); // Update state once after collecting all data
    }
  }, [share]);
  const ref = useRef();

  useEffect(() => {
    const radius = Math.min(width, height) / 2;

    // Clear any previous SVG content
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2 - 20})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    // Use the data passed as props or fallback to state
    const finalData = data.length > 0 ? data : myTagsWithKharcha;
    // Bind data and create pie slices
    const arcs = svg.selectAll("arc").data(pie(finalData)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    // Add labels
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.name)
      .style("font-size", "11px")
      .style("fill", "#fff");
  }, [data, myTagsWithKharcha, width, height]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
