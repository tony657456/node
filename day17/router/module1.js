module.exports = (app, fs) => {

    // http://localhost:3000
    app.get('/', (req, res) => {
        res.render('index.ejs', {
            length: 10
        });
    });

    // http://localhost:3000/about
    app.get('/about', (req, res) => {
        res.render('about.html');
    });

    // http://localhost:3000/list
    app.get('/list', (req, res) => {
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(!err){
                console.log(data);
                res.writeHead(200, {'content-type':'text/json;charset=utf-8'});
                res.end(data);
            }else{
                console.log(err);
            }
        })
    });

    // http://localhost:3000/getMember/apple  /apple항상바뀔수 있는 변수
    app.get('/getMember/:userid', (req, res) => {
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(!err){
                const member = JSON.parse(data);//JSON형식으로 불러옴 이렇게 안하면 글자형으로 갖고오기땜문
                res.json(member[req.params.userid]);
            }else{
                console.log(err);
            }
        })
    });

    //http://localhost:3000/joinMember/apple 추가
    app.post('/joinMember/:userid', (req, res) => {
        const result = {}; //실제로 데이터를 입력 요소가 수정되는건 상관없음 
        const userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 100;    // 100 : 실패
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result); 
            return false;//더이싱 진행이 안되게불러왔던 곳으로 이동
        }//여기까지 확인[1]

        //아이디중복 검사
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            const member = JSON.parse(data);
            if(member[userid]){
                result["success"] = 101;    // 101 : 중복
                result["msg"] = "중복된 아이디";
                res.json(result);
                return false;
            }
            console.log(req.body);//확인
            member[userid] = req.body;//아이디 패스워드
            fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf8', (err, data) => {
                if(!err){
                    result["success"] = 200;
                    result["msg"] = "성공";
                    res.json(result);
                }else{
                    console.log(err);
                }
            });
        });
    });


    //수정
    // http://localhost:3000/updateMember/apple1
    app.put('/updateMember/:userid', (req, res) => {
        const result = {};
        const userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 100;
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result);
            return false;
        }
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(!err){
                const member = JSON.parse(data);//JSON파일로 저장
                member[userid] = req.body;//전달한 정보
                fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf8', (err, data) => {
                    if(!err){
                        result["success"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }else{
                        console.log(err);
                    }
                });
            }else{  
                console.log(err);
            }
        });
    });

    // http://localhost:3000/deleteMember/berry
    app.delete('/deleteMember/:userid', (req, res) => {
        let result = {};
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            const member = JSON.parse(data);
            if(!member[req.params.userid]){//데이터가 없다면
                result["success"] = 102;
                result["msg"] = "사용자를 찾을 수 없음";
                res.json(result);
                return false;
            }
            delete member[req.params.userid]; //데이터를 삭제
            fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf8', (err, data) => {
                result["success"] = 200;
                result["msg"] = "성공";
                res.json(result);
            })
        });
    });
}