const express = require('express');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
// ======= https in native node module =======
const https = require('https');
// ======= We dont need to install this =======

// ========= Getting Data from open weather map api ============//
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

// ================== Sending a request to open weather map to get data of specific place ===========//
app.post('/',function(req,res){
    const city=req.body.cityName;
    const apiKey = "eeb3d8ceec9cc0d25302246a3a1a20f1";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
    https.get(url, function(response){
        response.on("data",function(data){

            const weatherData=JSON.parse(data);  //Parsing our data into JSON format to get fetched easily
            const temp=weatherData.main.temp;
            const weatherIcon = weatherData.weather[0].icon;
            const iconUrl="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"
            const description=weatherData.weather[0].description;

            console.log(description); 
            console.log(temp);

            res.write("<p>The kind of weather is : " + description + "</p>");
            res.write("<h1>Temperature of "+city+" is : " + temp+ " Degrees Celcius</h1>");
            res.write("<img src="+ iconUrl +">");
        });
    });

});


app.listen(3000,function(){
    console.log("App Listening to Port 3000")
});