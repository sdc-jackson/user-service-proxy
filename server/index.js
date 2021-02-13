var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var axios = require('axios');
require('dotenv');

var exampleAvailableDates = require('./exampleData/exampleAvailableDates.js');
var examplePhotos = require('./exampleData/examplePhotos.js');
var exampleUser = require('./exampleData/exampleUser.js');
var exampleSummary = require('./exampleData/exampleSummary.js');

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
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));

app.get('/bundle_availability.js', (req, res, next) => {
  console.log('requesting availability bundle');
  axios.get('https://availability-bundle.s3-us-west-2.amazonaws.com/bundle_availability.js')
  .then( (availabilityBundle) => {
    console.log('got a request to availability bundle');
    res.send(availabilityBundle.data);
  })
  .catch((err) => {
    console.log('error getting availability bundle');
    res.send(404);
  })
})

app.get('/users.js', (req, res, next) => {
  console.log('requesting users bundle');
  axios.get('https://fec-gnocchi-user-profile.s3-us-west-2.amazonaws.com/users.js')
  .then( (usersBundle) => {
    console.log('got a request to users bundle');
    res.send(usersBundle.data);
  })
  .catch((err) => {
    console.log('error getting users bundle');
    res.sendStatus(404);

  })
})


app.get('/rooms/:id/availableDates', (req, res) => {
  axios.get(`${AVAILABILITY_API_URL}/rooms/${req.params.id}/availableDates`)
  .then( (availableDatesRes) => {
    //console.log('got GET to availableDates', availableDatesRes.data);
    res.send(availableDatesRes.data);
  })
  .catch( (err) => {
    console.log('could not GET available dates');
    res.send(exampleAvailableDates.exampleData);
  })
});

app.get('/rooms/:id/minNightlyRate', (req, res) => {
  axios.get(`${AVAILABILITY_API_URL}/rooms/${req.params.id}/minNightlyRate`)
  .then( (minRateRes) => {
    //console.log('got GET to minNightlyRate', minRateRes.data);
    res.send(minRateRes.data);
  })
  .catch((err) => {
    console.log('could not GET nightly rate');
    res.send({minNightlyRate: 434});
  })
})

app.get('/users/:id/', (req, res) => {
  axios.get(`${USERS_API_URL}/users/${req.params.id}`)
  .then( (usersRes) => {
    //console.log('got GET to users', usersRes.data);
    res.send(usersRes.data);
  })
  .catch((err) => {
    console.log('could not GET user data');
    res.send(exampleUser.exampleUser);
  })
})


app.get('/rooms/:id/summary', (req, res) => {
  axios.get(`${SUMMARY_API_URL}/rooms/${req.params.id}/summary`)
  .then( (summaryRes) => {
    //console.log('got GET to summary', summaryRes.data);
    res.send(summaryRes.data);
  })
  .catch((err) => {
    console.log('could not GET summary info');
    res.send(exampleSummary.exampleSummary);
  })
})

app.get('/rooms/:id/getPhotosByRoomId', (req, res) => {
  axios.get(`${PHOTOS_API_URL}/rooms/${req.params.id}/getPhotosByRoomId`)
  .then( (photosRes) => {
    //console.log('got GET to getPhotosByRoomId', photosRes.data);
    res.send(photosRes.data);
  })
  .catch((err) => {
    console.log('could not GET photos by room id')
    res.send(examplePhotos.examplePhotos);
  })
})


console.log(`listening on port ${PORT}`);
app.listen(PORT);

module.exports = app;