const local_signup = require('./passport/local_signup');
const local_login = require('./passport/local_login');
const facebook = require('./passport/facebook');

module.exports =  function(app,passport){
    console.log('config/passport 호출!');





    passport.use('local_signup',local_signup);
    passport.use('local_login',local_login);
    passport.use('facebook',facebook);
}