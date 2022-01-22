const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//미들웨어 사용법1
app.get('/',function(req,res){
    res.send(`hello World`);
});

const myLogger = function(){
    console.log('LOGGED');
}

app.use(myLogger);

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중...`);
})
