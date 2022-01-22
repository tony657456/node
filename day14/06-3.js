const express = require('express');
const app = express();
const port = 3000;

app.use((req, res) =>{
 console.log('첫번째 미들웨어 실행');

 console.dir(req.header)
 const userAgent = req.header('User-Agent');
 console.log(userAgent);

 // http://localhost:3000/?userid=apple
 const paramName = req.query.userid; // get방식의 변수값을 가져옴
 console.log(paramName);

});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중..`)
});