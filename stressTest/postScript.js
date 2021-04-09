import http from 'k6/http';
import { check, sleep } from 'k6';


export default function () {

  //test updateOwnerInfo
  var url = 'http://localhost:5000/rooms/insertOwner';

  var payload = JSON.stringify({
    name: 'Adamtest10', //faker.name.firstName(),
    joinedDate: '2010-04-04',
    reviewsCount: 83333,
    isIdentityVerified: true,
    isSuperHost: true,
    responseRate: 97,
    responseTime: 205,
    profilePic: 'http://placeimg.com/640/480',
    language: 'Italian',
    duringStay: 'Proxy new during stay during stay stay stay stay',
    hostDescription: 'proxy new host desc hostDescription hostDescription hostDescription',
    ownerid: 10000009
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  http.post(url, payload, params);

}