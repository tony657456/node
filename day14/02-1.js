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
const data = "Hello Node.js !";

fs.writeFile('text2-1.txt',data,'utf-8',(err) => {
   if(err){
     console.log('에러발생!');
   }else{
     console.log('자장완료/비동기');
   }

});


fs.writeFileSync('text3.txt', data, 'utf-8');
console.log('저장완료 / 동기');
