var expressJwt = require('express-jwt');
var secret = sails.config.session.secret;

module.exports = expressJwt({secret: secret}, function (req, res) {
	if (!req.user) return res.send(401);
	res.send(200);
});