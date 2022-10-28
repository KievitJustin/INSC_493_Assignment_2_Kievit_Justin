onst data = [
    { campus: 'UT KNOXVILLE', enrollment: 29460, color: '#fd8105' },
    { campus: 'UT CHATTANOOGA', enrollment: 11590, color:'#ecaa1f' },
    { campus: 'MARTIN', enrollment: 7280, color: '#0e223f' },
    { campus: 'HEALTH SCIENCE CENTER', enrollment: 2815, color: '#036646' },
];

const width = 1000;
const height = 500;
const margin = { top: 75, bottom: 75, left: 75, right: 75 };

const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

const y = d3.scaleLinear()
    .domain([0, 30000])
    .range([height - margin.bottom, margin.top])

svg
    .append("g")
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.enrollment, b.enrollment)))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.enrollment))
    .attr('title', (d) => d.enrollment)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.enrollment))
    .attr("width", x.bandwidth())

    .attr('fill', d => {
        if(d.color == '#fd8105') {
            return '#fd8105'
        }
        else if(d.color == '#ecaa1f') {
            return '#ecaa1f'
        }
        else if(d.color == '#0e223f') {
            return '#0e223f'
        }
        else
            return '#036646'

    });

function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(5, data.format))
        .attr("font-size", '20px')
}

function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].campus))
        .attr("font-size", '15px')
}

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
svg.node();
