const http = require('http');

http.createServer((req, res) => {
 res.writeHead(200,{'content-type':'text/html'});
 res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>http 모듈 테스트</title></head><body style="background-color: deepskyblue;"><h2>http 모듈 테스트</h2><p>처음으로 실행하는 node.js http 서버</p></body></html>');
}).listen(3000, () => {
    console.log('서버 실행중....');
});