const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req, res) =>{
   console.log('첫번째 미드웨어 실행');
   res.redirect('http://www.naver.com');
});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});