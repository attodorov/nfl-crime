var express = require('express');
var http = require('http');
//A.T. TODO - those should be parameterized in an .env file at the least. Also url pattern can be nicely parameterized. 
var TOP_CRIMES_URL = "http://NflArrest.com/api/v1/crime";
var TOP_PLAYERS_FOR_CRIME_URL = "http://NflArrest.com/api/v1/crime/topPlayers/";
var TOP_TEAMS_FOR_CRIME_URL = "http://NflArrest.com/api/v1/crime/topTeams/";
var CRIME_TIMELINE_URL = "http://nflarrest.com/api/v1/crime/timeline/";

var EXPRESS_PORT = 3000;

//setup express app
//Enable CORS :)
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(EXPRESS_PORT, () => console.log(`NFL Crime REST service listening at http://localhost:${EXPRESS_PORT}`));

//A.T. generic GET response handler. Receive JSON data and pass it along to the response stream
// do some basic error handling as well 
function handleResponse(serviceResponse, expressResponse, dataTransformFunc) {
	var body = '';
    // accumulate response data
    serviceResponse.on('data', function (chunk) {
        body += chunk;
    });
    serviceResponse.on('end', function () {
    	try {
        	var topplayerResp = JSON.parse(body);
        	expressResponse.json(dataTransformFunc(topplayerResp));
    	} catch (respParseErr) {
    		expressResponse.status(500).send(body);
    	} 
    });
}

function encodeQueryParams(req) {
	var start_date = req.query.start_date;
	var end_date = req.query.end_date;
	var params = "";
	if (start_date && end_date) {
		params += "?start_date=" + start_date + "&end_date=" + end_date;
	}
	return params;
}

app.get('/api/v1/topcrimes', (req, res) => {
	try {
		http.get(TOP_CRIMES_URL + encodeQueryParams(req), function (serviceResponse) {
			var fn = function (rows) {
				var ret = [];
				if (rows) {
					rows.forEach(function (row) {
						ret.push({"name": row["Category"], "arrestcount": parseInt(row["arrest_count"])});
					});
				}
				return ret;
			};
		    handleResponse(serviceResponse, res, fn);
		}).on('error', function (err) {
		      console.log("Got an error: ", err);
		      res.status(500).send(err);
		});
	} catch (e) {
		res.status(500).end();
	}
});

//A.T. - I've figured the crimeID is just the Category name returned from the /topcrimes endpoint. 
app.get('/api/v1/topplayersforcrime/:crimeid', (req, res) => {
	try {
		http.get(TOP_PLAYERS_FOR_CRIME_URL + req.params.crimeid + encodeQueryParams(req), function (serviceResponse) {
			var fn = function (rows) {
				var ret = [];
				if (rows) {
					rows.forEach(function (row) {
						ret.push({"name": row["Name"], "arrestcount": parseInt(row["arrest_count"])});
					});
				}
				return ret;
			};
		    handleResponse(serviceResponse, res, fn);
		}).on('error', function (err) {
		      console.log("Got an error when fetching top players for crime " + req.params.crimeid + ": ", err);
		      res.status(500).send(err);
		});
	} catch (e) {
		res.status(500).end();
	}
});

app.get('/api/v1/topteamsforcrime/:crimeid', (req, res) => {
	try {
		http.get(TOP_TEAMS_FOR_CRIME_URL + req.params.crimeid + encodeQueryParams(req), function (serviceResponse) {
			var fn = function (rows) {
				var ret = [];
				if (rows) {
					rows.forEach(function (row) {
						ret.push({"id": row["Team"], "name": row["Team_name"], "city": row["Team_city"], "arrestcount": parseInt(row["arrest_count"])});
					});
				}
				return ret;
			};
		    handleResponse(serviceResponse, res, fn);
		}).on('error', function (err) {
		      console.log("Got an error when fetching top teams for crime " + req.params.crimeid + ": ", err);
		      res.status(500).send(err);
		});
	} catch (e) {
		res.status(500).end();
	}
});

app.get('/api/v1/crimetimeline/:crimeid', (req, res) => {
	try {
		var start_date = req.query.start_date;
		var end_date = req.query.end_date;
		http.get(CRIME_TIMELINE_URL + req.params.crimeid + encodeQueryParams(req), function (serviceResponse) {
			var fn = function (rows) {
				var ret = [];
				if (rows) {
					rows.forEach(function (row) {
						ret.push({"month": row["Month"], "year": row["Year"], "arrestcount": parseInt(row["arrest_count"])});
					});
				}
				return ret;
			};
		    handleResponse(serviceResponse, res, fn);
		}).on('error', function (err) {
		      console.log("Got an error when fetching crime timeline data for crime " + req.params.crimeid + ": ", err);
		      res.status(500).send(err);
		});
	} catch (e) {
		res.status(500).end();
	}
});