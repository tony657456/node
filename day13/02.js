// const http = require('http'); // 모듈 갖고 오기
// const hostname = '127.0.0.1'; // 서버 주소
// const port = 3000; // 인터넷 경로 포트번호

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});