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

//비동기처리는 예외처리를 할 필요가 없다
fs.readFile('text1.txt', 'utf-8', (err, data) => {
   if(err){
      console.log('에러발생/비동기');
   }else{
      console.log(data);
   }
});

try{
 const text = fs.readFileSync('text1.txt', 'utf-8');
 console.log(`동기식으로 읽음:${text}`)
}catch(e){
 console.log('에러발생/동기');
}
console.log('프로그램 종료');