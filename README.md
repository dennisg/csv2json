
My first stab at creating a node module for parsing CSV to JSON. Initially created for parsing the earthquake data.

I tried to make it as generic as possible, but for now it works for me.


Usage: 

This example assumes the CSV starts with a valid header:

var csv = require('csv2json');

var opts = { url : 'http://<your-csv-url>' };

csv.parse(function(err, data){
	console.log(data);
}, opts);


You can also supply your own header:

This example assumes the CSV starts with a valid header (but please make sure the array size of the 
header at least matches that of the returned data):

var csv = require('csv2json');

var opts = { url : 'http://<your-csv-url>' , header : [ 'h1', 'h2', ... ] };

csv.parse(function(err, data){
	console.log(data);
}, opts);
