module.exports = {
    server_port: 3000, //포트설정 
    db_url: 'mongodb://localhost:27017/frontenddb', //데이터베이스 연결
    db_schemas: [{file:'./member_schema', collection:'member2', schemaName:'MemberSchema', 
    modelName:'MemberModel'}],  // 스키마 따로 만들기 
    facebook: { //페이스북 갖고 올 세션
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }

}