// Create an SVG
var w = 940, h = 500, padding = 1;

var svg = d3.select('#visualization')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

// Pull in some data from a CSV
d3.csv('/data/dummy-data.csv', function(error, dataset) {
  
  if (error) {
    console.log(error);
    return;
  }
  
  // TODO: Column names are static and that's a terrible idea.
  
  // Scale the visualization based on the range of values.
  var maxValue = h, minValue;
  for (var i = dataset.length - 1; i >= 0; i--){
    if ( dataset[i].Data > maxValue ) maxValue = dataset[i].Data;
    if ( minValue === undefined || dataset[i].Data < minValue ) minValue = dataset[i].Data;
  };
  // Adjust the range and lowest value so that it doesn't get adjusted to zero.
  var range = maxValue - minValue + 5;
  minValue = minValue - (h / 100);
  
  // For some reason, this doesn't work when determining the y-offset.
  function determineBarHeight(value) {
    return (value - minValue) / range * h + (h / 20);
  }
  
  // Append some bars to the screen based on the data
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('fill', 'rgb(93, 173, 226)')
    .attr('x', function (d, i) {
      return i * (w / dataset.length);
    })
    .attr('y', function (d, i) {
      return h - (d.Data - minValue) / range * h + (h / 20);
    })
    .attr('width', function (d, i) {
      return w / dataset.length - padding;
    })
    .attr('height', function (d, i) {
      return determineBarHeight(d.Data);
    });

});