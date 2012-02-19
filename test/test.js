var csv = require('../lib/csv');

var url = 'http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt';
var opts = { url : url };


csv.parse(function(err, data) {
	console.log(data);
}, opts);

