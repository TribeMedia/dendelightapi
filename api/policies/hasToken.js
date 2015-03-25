var expressJwt = require('express-jwt');
var secret = '6ab198087a16e6d49b438a7aa514731f';

module.exports = expressJwt({secret: secret});