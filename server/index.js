var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var axios = require('axios');
require('dotenv');
var PORT = 5000;
var PORT_AVAILABILITY = 5001;
var PORT_PHOTOS = 5005;
var PORT_USERS = 5007;
var PORT_SUMMARY = 5002;
var USE_LOCAL = false;

AVAILABILITY_API_URL = USE_LOCAL ? `http://localhost:${PORT_AVAILABILITY}` : `http://ec2-54-149-117-186.us-west-2.compute.amazonaws.com:5001`;
USERS_API_URL = USE_LOCAL ? `http://localhost:${PORT_USERS}` : `http://ec2-34-210-111-179.us-west-2.compute.amazonaws.com:5007`;
PHOTOS_API_URL = USE_LOCAL ? `http://localhost:${PORT_PHOTOS}` : `http://localhost:${PORT_PHOTOS}`; //update later
SUMMARY_API_URL = USE_LOCAL ? `http://localhost:${PORT_SUMMARY}` : `http://localhost:${PORT_SUMMARY}`; //update later


var app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));

app.get('/bundle_availability.js', (req, res, next) => {
  console.log('requesting availability bundle');
  axios.get('https://availability-bundle.s3-us-west-2.amazonaws.com/bundle_availability.js')
  .then( (availabilityBundle) => {
    console.log('got a request to availability bundle');
    res.send(availabilityBundle.data);
  })
})



app.get('/rooms/:id/availableDates', (req, res) => {
  axios.get(`${AVAILABILITY_API_URL}/rooms/${req.params.id}/availableDates`)
  .then( (availableDatesRes) => {
    //console.log('got GET to availableDates', availableDatesRes.data);
    res.send(availableDatesRes.data);
  })
});

app.get('/rooms/:id/minNightlyRate', (req, res) => {
  axios.get(`${AVAILABILITY_API_URL}/rooms/${req.params.id}/minNightlyRate`)
  .then( (minRateRes) => {
    //console.log('got GET to minNightlyRate', minRateRes.data);
    res.send(minRateRes.data);
  })
})

app.get('/users/:id/', (req, res) => {
  axios.get(`${USERS_API_URL}/users/${req.params.id}`)
  .then( (usersRes) => {
    //console.log('got GET to users', usersRes.data);
    res.send(usersRes.data);
  })
})


app.get('/rooms/:id/summary', (req, res) => {
  axios.get(`${SUMMARY_API_URL}/rooms/${req.params.id}/summary`)
  .then( (summaryRes) => {
    //console.log('got GET to summary', summaryRes.data);
    res.send(summaryRes.data);
  })
})

app.get('/rooms/:id/getPhotosByRoomId', (req, res) => {
  axios.get(`${PHOTOS_API_URL}/rooms/${req.params.id}/getPhotosByRoomId`)
  .then( (photosRes) => {
    //console.log('got GET to getPhotosByRoomId', photosRes.data);
    res.send(photosRes.data);
  })
})


console.log(`listening on port ${PORT}`);
app.listen(PORT);

module.exports = app;