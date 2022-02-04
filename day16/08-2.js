const express = require('express');
const fs = require('fs');
// npm i ejs
const ejs = require('ejs');

const app = express();
const port = 3000;

const router = express.Router();

// localhost:3000/login
router.route('/login').post((req, res) => {
    const userinfo = {userid:'apple', userpw:'1234'};
     //매개변수를 발생해서 직접 ejs파일에 변수에 입력
    fs.readFile('./ejs2.ejs', 'utf-8', (err, data) => {
        if(!err) {
            res.writeHead(200, {'content-type':'text/html'});
            res.end(ejs.render(data,userinfo));
            //res.end(ejs.render(ejs파일,매개변수))
            //ejs.render(ejs파일,매개변수) 
            //ejs파일에 미리 해당되는 변수를 선언 했다면 변수값이 자동으로 입력
        }else{
            console.log(err);
        }
    })
})

app.use('/', router);

app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중...`);
})
