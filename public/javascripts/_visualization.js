// Create an SVG
var w = 400, h = 200;

d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Pull in some data from a CSV
d3.csv('/data/dummy-data.csv', function(error, data) {
  
  if (error) {
    console.log(error);
    return;
  }
  
  // Append some text to the screen based on the data
  d3.select('body')
    .selectAll('p')
    .data(data)
    .enter()
    .append('p')
    .text(function (row) { return "Year: " + row.Year + " (" + row.Data + ")"});

});