const express = require('express');

const app = express();
const port = 3000;

//미들웨어 사용법2
const myLogger = function(req, res, next){
    console.log('LOGGED');
    next();
}

app.use(myLogger);

app.get('/',function(req,res){
    res.send(`hello World2`);
});

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중...`);
})
