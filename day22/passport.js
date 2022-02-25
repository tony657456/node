const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const static = require('serve-static');//페이지에 직접 접근 해주는 모듈
const path = require('path');//url 접근을 해야 하므로 패스모듈 설치

//페이지 연결이 잘못 요청이 되었을때 정상적으로 페이지 이동
// npm i express-error-handler
const expressErrorHandle = require('express-error-handler');

// npm i passport
const passport = require('passport');

const app = express();
const router = express.Router();

//세션설정
app.use(cookieParser());
app.use(expressSession({
    secret: '!@#$%^&*()',
    resave:false, //세션이 계속 저장되어 있는 것을 방지
    saveUninitialized: true,// 초기화 되는 상태를 유지
    cookie:{maxAge:60 * 60 * 1000}
}));

app.use(logger('dev'));
app.use(passport.initialize());// 패스포트 초기화
app.use(passport.session());// 섹션객체 생성
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public',static(path.join(__dirname, 'public')));//퍼블릭파일에 직접 연결

//페이지 연결이 오류일때 뜰 404페이지 설정
const errorHandle = expressErrorHandle({
    static:{
        '404': './public/404.html'
    }
});
app.use(expressErrorHandle.httpError(404));
app.use(errorHandle);

//뷰템플리 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 사용자 정의 모듈 연결 
const config = require('./config/config');
const database = require('./database/database');

const configPassport = require('./config/passport');
configPassport(app, passport);

const userPassport = require('./routes/route_member');
userPassport(router, passport);



app.listen(config.server_port, ()=> {
    console.log(`${config.server_port}포트로 서버 실행중...`);
    database.init(app, config);
});