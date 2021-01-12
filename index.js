const express = require('express');
const { request } = require('http');
const app = express();
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

console.log(process.env);


app.listen(3000, () => console.log('listiening at 3000'));
app.use(express.static('public'));
app.use(express.json());
const database = new Datastore('datebase.db');
database.loadDatabase();


app.get(('/api'), (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        } else {
            response.json(data)
        }
    })
    
})

app.post(('/api'), (request, response) => {
    const data = request.body;
    database.insert(data);
    response.json(data);
})

app.get(('/weather/lat/:lat/lng/:lng'), async (request, response) => {
    console.log((request.params));

const lat = request.params.lat;
const lng = request.params.lng;
const api_key = process.env.API_KEY;
console.log(lat);
console.log(lng);
const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`
const fetch_response = await fetch(api_url);
const json_op = await fetch_response.json();


const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lng}`
console.log(aq_url);
const fetch_aq = await fetch(aq_url);
const json_aq = await fetch_aq.json();


const dataToClient = {
    openWeather: json_op,
    aqWeather: json_aq
}

console.log(dataToClient);

response.json(dataToClient);
});