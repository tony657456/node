const express = require('express');
const bodyparser = require('body-parser');
const connect = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
const port = 3000;

app.use(bodyparser.urlencoded({extended: false}));

let database;

function connectDB(){
    const databaseURL = "mongodb://localhost:27017";
    MongoClient.connect(databaseURL,(err, db) => {
        if(!err){
        const tempdb = db.db('frontenddb01'); // 접근 하고자 하는 데이터베이스 이름
        database = tempdb;
        console.log("mongodb 데이터베이스 연결 성공!")
        }else{
        console.log(err);
        }
    });
}

router.route('/member/regist').post((req,res) => {
    console.log('/member/regist 호출!!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const age = req.body.age;

    // 입력값 확인
    console.log(`userid:${userid}, userpw:${userpw}, username:${username}, age:${age}`);

    if(database){
        joinMember(database, userid, userpw, username, age, (err, result) => {// 값이 추가됐는지 확인
            if(!err){
                if(result.insertedCount > 0){
                    res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.end();
                } else {
                    res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.end();
                }
            }else{
                res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.end();
            }
        });
    } else {
        res.writeHead(200, {'content-type':'text/html;charset=utf8'});
        res.write('<h2>회원가입 실패</h2>');
        res.end();
    }
});

router.route('/member/login').post((req, res) => {
    console.log('/member/login 호출!!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid}, userpw:${userpw}`);

    if(database){
        loginMember(database, userid, userpw, (err, result) => {
            if(!err){ // 콜백함수 연결 상태 확인

                if(result){
                console.dir(result);
                const resultUserid = result[0].userid;
                const resultUserpw = result[0].userpw;
                const resultUsername = result[0].username;
                const resultAge = result[0].age;

                res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공!</h2>');
                res.write(`<p>${resultUserid}/${resultUsername}님 환영합니다!</p>`);
                res.write(`<p>나이는${resultAge}입니다.</p>`);
                res.end();
                }else{
                    res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<h2>아이디와 비밀번호를 확인하세요.</h2>');
                    res.end();
                }
            }else{
                res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                res.write('<h2>서버 오류 발생! 로그인 실패</h2>');
                res.end();
            }
        });
    }else{
        res.writeHead(200, {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
});

router.route('/member/edit').post((req, res) => {
    console.log('/member/edit 호출!');

    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const age = req.body.age;

    console.log(`userid:${userid}, userpw:${userpw}, name:${username}, age:${age}`);

    if(database){
        editMember(database, userid, userpw, username, age, (err, result) => {
            if(!err){
                if(result.modifiedCount > 0){
                    res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원정보 수정 성공!!</h2>');
                    res.write('<p>회원정보 수정 성공!!</p>');
                    res.end();
                }else{
                    res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원정보 수정 실패</h2>');
                    res.write('<p>회원정보 수정 실패!!</p>');
                    res.end();
                }
            }else{
                res.writeHead(200, {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>회원정보 수정 실패!!</p>');
                res.end();
            }
        });
    }
});

const joinMember = (database, userid, userpw, username, age, callback) => {
    console.log('joinMember 호출!');
    const members= database.collection('member');
    // 배열 방식으로 선언
    members.insertMany([{userid:userid, userpw:userpw, username:username, age:age}], (err, result) => {
        if(!err){ // 값을 넣을 때 에러가 나지 않는다면
            if(result.insertedCount > 0){// 추가되는 객체의 갯수
                console.log(`사용자 document ${result.insertedCount}명 추가!`)
            } else {
                console.log('사용자 documnet 추가되지 않음!');
            }
            callback(null, result);
            return;
        }else{
            console.log(err);
            callback(err, null);
        }
    });
};

const loginMember = (database, userid, userpw, callback) => {
    console.log('loginMember 호출!');
    const members= database.collection('member');
    members.find({userid:userid, userpw:userpw}).toArray((err, result) => {
        if(!err){
            if(result.length > 0){
                console.log('사용자를 찾았습니다.');
                callback(result);
            }else{
                console.log('일치하는 사용자가 없습니다.');
                callback(null);
            }
        }else{
            console.log(err);
            callback(err, null);
        }

    });
}

const editMember = (database, userid, userpw, username, age, callback) => {
    console.log('editMember 호출!!');
    const members= database.collection('member');
    members.updateOne({userid:userid}, {$set:{userid:userid, userpw:userpw, username:username, age:age}}, (err, result) => {
        if(!err){
            if(result.modifiedCount > 0) {
                console.log(`사용자 document ${result.modifiedCount}명 수정됨`);
            }else{
                console.log('수정 된 document 없음');
            }
            callback(null, result);
            return;
        }else{
            console.log(err);
            callback(err, null);
        }
    })
}

app.use("/", router);

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중...`);
    connectDB();
});