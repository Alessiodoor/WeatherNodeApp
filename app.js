const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// readFileSync per leggere json nella cartella
const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const rawdata = fs.readFileSync('variables.json');
const variables = JSON.parse(rawdata);
const apiKey = variables.apiKey;

var description = "";
var query = "";
var temp = null;
var imgURL = "";

app.get("/", function(req, res) {
	let info = "Search for a city to see the weather infos.";
	if(temp != null){
		info = "The temperature at " + query + " is " + temp + "C.";
	}

	res.render("index", {description: description, info: info, imgURL: imgURL});
});

app.post("/", function(req, res) {
	// importante: aggiungi https://
	query = req.body.cityName;
	const units = "metric";
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
	https.get(url, function(response) {
		console.log(response.statusCode);

		response.on("data", function(data) {
			//data in formato esadecimale
			const weatherData = JSON.parse(data);
			const cod = weatherData.cod;
			if(cod === 200){
				temp = weatherData.main.temp;
				description = "Description : " + weatherData.weather[0].description;
				const icon = weatherData.weather[0].icon;
				imgURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
			}else{
				description = "Error: " +weatherData.message;
				temp = null;
			}

			res.redirect("/");
		})
	});
})

app.listen(3000, function(){
	console.log('Running on port 3000...');
});