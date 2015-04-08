var expressJwt = require('express-jwt');
var secret = '6ab198087a16e6d49b438a7aa514731f';

module.exports = expressJwt({secret: secret}, function (req, res) {
	if (!req.provider) return res.send(401)
	res.send(200);
});