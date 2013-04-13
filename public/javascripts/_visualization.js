// Create an SVG
var w = 500, h = 500, padding = 1;

var svg = d3.select('body')
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
  
  var maxValue = h, minValue;
  for (var i = dataset.length - 1; i >= 0; i--){
    if ( dataset[i].Data > maxValue ) maxValue = dataset[i].Data;
    if ( minValue === undefined || dataset[i].Data < minValue ) minValue = dataset[i].Data;
  };
  var range = maxValue - minValue;
  
  // Append some text to the screen based on the data
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
      return i * (w / dataset.length);
    })
    .attr('y', function (d, i) {
      return 0;
    })
    .attr('width', function (d, i) {
      return w / dataset.length - padding;
    })
    .attr('height', function (d, i) {
      return (d.Data - minValue) / range * h + (h / 20);
    });

});