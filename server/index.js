var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var axios = require('axios');
var PORT = 5000;
var PORT_AVAILABILITY = 5001;
var PORT_PHOTOS = 5005;
var PORT_USERS = 5007;

var app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));



app.get('/rooms/:id/availableDates', (req, res) => {
  axios.get(`http://localhost:${PORT_AVAILABILITY}/rooms/${req.params.id}/availableDates`)
  .then( (availableDatesRes) => {
    console.log('got GET to availableDates', availableDatesRes.data);
    res.send(availableDatesRes.data);
  })
});

app.get('/rooms/:id/minNightlyRate', (req, res) => {
  axios.get(`http://localhost:${PORT_AVAILABILITY}/rooms/${req.params.id}/minNightlyRate`)
  .then( (minRateRes) => {
    console.log('got GET to minNightlyRate', minRateRes.data);
    res.send(minRateRes.data);
  })
})

app.get('/users/:id/', (req, res) => {
  axios.get(`http://localhost:${PORT_USERS}/users/${req.params.id}`)
  .then( (usersRes) => {
    console.log('got GET to users', usersRes.data);
    res.send(usersRes.data);
  })
})



app.get('/rooms/:id/getPhotosByRoomId', (req, res) => {
  axios.get(`http://localhost:${PORT_PHOTOS}/rooms/${req.params.id}/getPhotosByRoomId`)
  .then( (photosRes) => {
    console.log('got GET to getPhotosByRoomId', photosRes.data);
    res.send(photosRes.data);
  })
})


console.log(`listening on port ${PORT}`);
app.listen(PORT);

module.exports = app;