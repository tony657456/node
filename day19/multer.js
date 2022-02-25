const express = require('express');
const bodyparser = require('body-parser');
const static = require('server-static'); // npm i server-static
const path = require('path');
const logger = require('morgan'); // npm i morgan
const logger = require('multer'); // npm i multer
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended:false}));

// 특정폴더
app.use('/public', static(path.join(__dirname,'public'))) // 파일을 첨부하는 html이 있는 경로 주소로 설정
app.use('/uploads', static(path.join(__dirname,'uploads'))) // 첨부 된 파일이 저장되는 경로
app.unsubscribe(logger('dev'))