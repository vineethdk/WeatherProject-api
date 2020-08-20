const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  console.log(req.body.CityName);

  const query = req.body.CityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=81b861ca44d12963d0f26402be6efc48&units=metric";
  https.get(url,function(response){
    // console.log(response.statusCode);
    response.on("data",function(data){
      const WeatherData  = JSON.parse(data);
      const temp = WeatherData.main.temp;
      const desc = WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in "+query+" is "+temp+"</h1>");
      res.write("The weather is currently "+desc);
      res.write("<img src="+imgUrl+">");
      res.send();

    });
  });
})





app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
