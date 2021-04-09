import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 1 },
    { duration: '1s', target: 10 },
    { duration: '1s', target: 100 },
    { duration: '1s', target: 100 }
  ],
};

export default function () {

  for (var id = 9900000; id <= 10000000; id++) {
    let res = http.get(`http://localhost:5000/rooms/${id}`);
    check(res, { 'status was 200': (r) => r.status == 200 });
  }

}