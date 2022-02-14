const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//views엔진등록 공식(views폴더생성)
app.engine('html',require('ejs').renderFile);//ejs파일을 자동으로 html로 변환
app.use(bodyParser.urlencoded({extended: false}));

const module1 = require('./router/module1')(app, fs);//express()를 전달


app.listen( port, () => {
    console.log(`${port}번 포트로 서버 실행중...`);
})
