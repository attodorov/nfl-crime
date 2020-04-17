var express = require('express');
var http = require('http');

//A.T. TODO - those should be parameterized in an .env file at the least. Also url pattern can be nicely parameterized. 
var TOP_CRIMES_URL = "http://NflArrest.com/api/v1/crime";
var TOP_PLAYERS_FOR_CRIME_URL = "http://NflArrest.com/api/v1/crime/topPlayers/";
var TOP_TEAMS_FOR_CRIME_URL = "http://NflArrest.com/api/v1/crime/topTeams/";

var EXPRESS_PORT = 3000;

//setup express app
const app = express();
app.listen(EXPRESS_PORT, () => console.log(`NFL Crime REST service listening at http://localhost:${EXPRESS_PORT}`));

//A.T. generic GET response handler. Receive JSON data and pass it along to the response stream
// do some basic error handling as well 
function handleResponse(serviceResponse, expressResponse) {
	var body = '';
    // accumulate response data
    serviceResponse.on('data', function (chunk) {
        body += chunk;
    });
    serviceResponse.on('end', function () {
    	try {
        	var topplayerResp = JSON.parse(body);
        	expressResponse.json(topplayerResp);
    	} catch (respParseErr) {
    		expressResponse.status(500).send(body);
    	} 
    });
}

app.get('/api/v1/topcrimes', (req, res) => {
	try {
		http.get(TOP_CRIMES_URL, function (serviceResponse) {
		    handleResponse(serviceResponse, res);
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
		http.get(TOP_PLAYERS_FOR_CRIME_URL + req.params.crimeid, function (serviceResponse) {
		    handleResponse(serviceResponse, res);
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
		http.get(TOP_TEAMS_FOR_CRIME_URL + req.params.crimeid, function (serviceResponse) {
		    handleResponse(serviceResponse, res);
		}).on('error', function (err) {
		      console.log("Got an error when fetching top teams for crime " + req.params.crimeid + ": ", err);
		      res.status(500).send(err);
		});
	} catch (e) {
		res.status(500).end();
	}
});