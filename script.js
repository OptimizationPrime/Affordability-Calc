import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '60s', target: 200 },
    { duration: '30s', target: 200 },
    { duration: '60s', target: 400 },
    { duration: '30s', target: 400 },
    { duration: '60s', target: 800 },
    { duration: '30s', target: 800 },
    { duration: '60s', target: 1600 },
    { duration: '30s', target: 1600 },
    { duration: '60s', target: 2000 },
    { duration: '30s', target: 2000 },
  ],
  thresholds: {
    errors: ['rate<0.01'],
    http_req_duration: ['p(99)<50'],
  },
};

export default () => {
  const res = http.get(`http://localhost:8020/listings/${Math.floor(Math.random() * 10000000 + 1)}/price`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
};
