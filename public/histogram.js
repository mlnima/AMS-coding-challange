const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", (data) => {

    const x = d3.scaleLinear()
        .domain([0, 1000])
        .range([0, width]);

    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

    const histogram = d3.histogram().value((d) => d.price).domain(x.domain()).thresholds(x.ticks(70));

    const bins = histogram(data);

    const y = d3.scaleLinear().range([height, 0]);

    y.domain([0, d3.max(bins, (d) => d.length)]);

    svg.append("g").call(d3.axisLeft(y));

    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", (d) => "translate(" + x(d.x0) + "," + y(d.length) + ")")
        .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
        .attr("height", (d) => height - y(d.length))
        .style("fill", "#69b3a2")

});