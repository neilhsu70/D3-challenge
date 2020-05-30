// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 30,
  right: 30,
  bottom: 70,
  left: 50,
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("./assets/data/data.csv").then((data) => {
  console.log(data);
  data.forEach(function (d) {
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
  });
  var xLinearScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data, (d) => d.poverty));
  var yLinearScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain(d3.extent(data, (d) => d.healthcare));
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  chartGroup.append("g").call(leftAxis);

  chartGroup
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .text("In Poverty (%)");
  chartGroup
    .append("text")
    .attr("transform", `translate(-30, ${height / 2}) rotate(-90)`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .text("Lacks Healthcare (%)");

  chartGroup
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xLinearScale(d.poverty))
    .attr("cy", (d) => yLinearScale(d.healthcare))
    .attr("r", 10)
    .style("fill", "#8cc8ff");

  chartGroup
    .append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d.abbr)
    .attr("dy", (d) => yLinearScale(d.healthcare) + 4)
    .attr("dx", (d) => xLinearScale(d.poverty))
    .style("font-size", "10px")
    .style("text-anchor", "middle")
    .style("stroke-width", "10px")
    .style("fill", "black");
});
