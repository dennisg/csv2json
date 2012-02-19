var request = require('request');
var Lazy = require('lazy');

var parse = function(callback, opts) {
	opts = opts || {};
	opts.url = opts.url || 'http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt';

	var header = opts.header;
	request(opts.url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			  var lazy = new Lazy();
			  lazy.lines
			  	.map(String)
		        //while testing
		        .take(2)
		        //remove the line feed
		        .map(function(line){ return line.split('\r')[0]; })
		        //filter the header
		        .filter(function(line) {
		        	if (header === undefined) {
		        		header = line.toLowerCase().split(',');
		        		return false;
		        	}
		        	return true;
		        })
		        //split, taking account for quotes
		        .map(function(line) { return line.split(/,(?!(?:[^",]|[^"],[^"])+")/); })
		        //remove the quotes if they are there
		        .map(function(data) {
		        	var trimmed = []
		        	data.forEach(function(e) { trimmed.push(e.replace(/"/g, '')); });
		        	return trimmed;
		        })
		        //and finally convert to an object
		        .map(function(data) {
		        	var result = {};
		        	for (var i=0;i<header.length;i++) {
		        		result[header[i]] = data.shift();
		        	}
		        	callback(result);
		        });
			  lazy.emit('data', body);
			  lazy.emit('end');
		  }
	});	
}
module.exports = {
	parse : parse
}