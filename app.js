const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {
    const query1 = req.body.CityName
    const query2= req.body.CountryName
    const apikey = "c154fa5a09139d802c9c997c81fe2cfe";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query1 +","+query2 +"&appid=" + apikey;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temprature = Number(weatherData.main.temp)-273;
            const Description = weatherData.weather[0].description;
            console.log(weatherData);
            const icon = weatherData.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The teamprature at "+query1+" is " + String(temprature) + " C and weather is " + Description + "</h1>");
            res.write("<img src=" + imageurl + ">");
            res.send();
        })
    });
});
app.listen(process.env.PORT || 300, function () {
    console.log("Runnning 300");
});
