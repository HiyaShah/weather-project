const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req, res){
  const query = req.body.cityName;
  const apiKey= "c77d7597600464fc1146c28a986ac945";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData= JSON.parse(data);
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.setHeader('Content-Type', 'text/html');
      res.write("The weather is currently "+weatherDescription+".");
      res.write("<h1> The temperature in "+query+" is "+temp +" degrees fahrenheit.</h1>");
      res.write("<img src="+ imgUrl+">");
      res.send();
    })
  })
})










app.listen(3000, function(){
  console.log("Server online");
});
