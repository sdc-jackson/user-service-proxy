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

app.get('/')

// app.get('/rooms/:id/getPhotosByRoomId?roomId=100')



// app.get('/rooms/:id', (req, res) => {
//   roomId = req.params.id;
//   axios.get(`http://localhost:5001/rooms/${roomId}`)
//   .then(function (availabilityResponse) {
//     console.log('existing res object', res);
//     console.log('hi', availabilityResponse);
//     res.writeHead(200);
//     res.write(availabilityResponse.data);
//     res.end();
//   })
// })

console.log(`listening on port ${PORT}`);
app.listen(PORT);

module.exports = app;