module.exports = function(app) {
  
  app.get('/', function (req, res) {
    res.render('index', { 
      title: app.get('title'),
      data: 'https://docs.google.com/spreadsheet/pub?key=0Ar2Io2uAtw9TdEFvb2t5U3BiZDhQRlNSRjRTY3Q2Rmc&output=html'
    });
  });
  
};