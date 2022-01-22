/*
FileSystem 모듈
파일처리와 관련된 모듈입니다. 
node.js에서 가장 중요하고 기초가 되는 모듈입니다.

메소드
readFile() : 파일을 비동기적으로 읽습니다.
readFileSync() : 파일을 동기적으로 읽습니다.
writeFile() : 파일을 비동기적으로 씁니다.
writeFileSync() : 파일을 동기적으로 씁니다.
*/

const fs = require('fs');//파일을 다루는 모듈을 연결

fs.readFile('text1.txt','utf-8',(err,data) => {// 비동기식(콜백)
  if(err){
      console.log(err);
  }else{
    console.log(`비동기식으로 읽음:{data}`);   
  }
});

const text = fs.readFileSync('text1.txt', 'utf-8');//동기
console.log(`동기식으로 읽음:{text}`)   