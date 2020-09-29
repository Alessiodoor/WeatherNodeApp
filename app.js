const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// readFileSync per leggere json nella cartella
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const rawdata = fs.readFileSync('variables.json');
const variables = JSON.parse(rawdata);
const apiKey = variables.apiKey;

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	// importante: aggiungi https://
	const query = req.body.cityName;
	const units = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
	https.get(url, function(response) {
		console.log(response.statusCode);

		response.on("data", function(data) {
			//data in formato esadecimale
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imgURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"

			res.write("<p>Description: " + description + "</p>");
			res.write("<h1>Temperatura a " + query + ": " + temp + "C.</h1>");
			res.write("<img src=" + imgURL + ">");
			// NB: ci può essere solo un res.send!
			res.send();
		})
	});
})

app.listen(3000, function(){
	console.log('Running on port 3000...');
});