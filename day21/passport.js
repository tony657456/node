const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const static = require('serve-static'); // 페이지에 직접 접근 해주는 모듈
const path = require('path'); // url 접근을 해여하므로 패스모듈 설치

// 페이지 요청이 잘못 요청이 되었을 때 정상적으로 페이지 이동
const expressErrorHandle = require('express-error-handler');

const passport = require('passport');