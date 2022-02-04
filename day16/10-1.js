// npm i nodemailer
const nodemailer = require('nodemailer');

//nodemailer 설정
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'gomaci75@gmail.com',//메일계정
        pass: 'kim490653kim*'//비밀번호
    },
    host: 'smtp.mail.com',
    port: '535'
});

//메일발송옵션설정
const mailOptions = {
    from: "김순조<gomaci75@gmail.com>",
    to: "김순조<gomaci@naver.com>",
    subject: "node.js의 nodemailer 테스트중입니다.",
    html: "<h2>안녕하세요. 메일이 잘 가나요?</h2><p style='color: deeppink'>정말 잘 가네요~~</p>"
};

transporter.sendMail(mailOptions, (err, info) => {
    transporter.close();
    if(err){
        console.log(err);
    }else{
        console.log(info);
    }
});