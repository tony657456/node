const event =require('events');

// 이벤트 관련 메소드를 사용할 수 있는 EventEmitter 객체를 만듭니다.
const eventEmitter = new event.EventEmitter();

const connectHandle = function(){ //3
    console.log('연결성공');
    eventEmitter.emit('data_received'); //다시 이벤트가 발생 4
}

// connection 이벤트와 connectHandler 핸들러와 연결-함수연결 2
eventEmitter.on('connection', connectHandle)

// data_receive 이벤트와 익명함수와 연결 5
eventEmitter.on('data_received', () => { console.log('데이터수신')});

eventEmitter.emit('connection');  // 이벤트를 발생 1