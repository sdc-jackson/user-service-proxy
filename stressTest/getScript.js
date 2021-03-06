import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 1 }, // below normal load
    { duration: '1m', target: 10 },
    { duration: '1m', target: 100 }, // normal load
    { duration: '1m', target: 1000 },// around the breaking point
    { duration: '1m', target: 100 },
    { duration: '1m', target: 10 },
    { duration: '1m', target: 1 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.

  ],
};

export default function () {

  //var id = 9999991;
  // let res = http.get(`http://localhost:5000/rooms/${id}`);
  // check(res, { 'status was 200': (r) => r.status == 200 });

  for (var id = 9000000; id < 9500000; id++) {
    let res = http.get(`http://localhost:5000/rooms/${id}`);
    check(res, { 'status was 200': (r) => r.status == 200 });
  }

}