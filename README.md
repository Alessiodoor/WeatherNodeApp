# WeatherNodeApp
WeatherNodeApp is a web app to see the weather of a city based on openweathermap.org apis.

## Installation

This web app is made be nodeJs that can be downloaded from this link https://nodejs.org/it/download/ 

To install the packages you need to use npm, first of all go to the project repository and run the following commands

```bash
npm init
```

After this you will find a file called package.json in your repository.
Than you need to install all the packages

```bash
npm install express
```

```bash
npm install body-parser
```

You can see the packages installed in the package.json file, under the 'dependencies' variable.

## OpenWeather APIs

This project use openweather to retrieve the weather informations, to send requests you need an account on openweathermap.org and an ApiKey.

## Adding variables.json

After you get the apiKey from openweathermap.org you need to create a json file to store it. This file is inported automaticaly in the app.js file.

```json
  {
    "apiKey": "your key"
  }
```
