let express = require('express');
let app = express();
let request = require('request');
let fs = require('fs');
let ejs= require('ejs');
let argv = require('yargs').argv
require('dotenv').config();

let apiKey = process.env.OPEN_API_KEY
let city = argv.c || 'seoul';
var port = 3000;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

app.set('view engine' , 'ejs');
app.listen(port ,()=>{
    console.log('Server is Starting 3000 PORT')
})

app.get('/weather', (req, res)=>{
    request(url, (error, request, body)=>{
        if(error){
            console.log('error:'+error);
        }

        var weather = JSON.parse(body);
        var message = `지금 온도는 ${Math.ceil((weather.main.temp -32)/1.8)} degrees in ${weather.name} `
        console.log("이것은 바디"+body);
        console.log("이것은 웨더"+weather);
        console.log(message);

        var result ={
            weatherResult: Math.ceil((weather.main.temp -32)/1.8), 
            weatherMessage: message
        }

        fs.readFile('index.html', 'utf-8', (error , data)=>{
            if(error){
                console.log(error);
            }

        res.send(
            ejs.render(data, {
                data:result.weatherResult,
                message: result.weatherMessage
            })
            // `<h1>${message}</h1>`
        )
        })
        console.log(result);
    })
})
