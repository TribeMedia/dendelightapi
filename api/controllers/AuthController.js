var passport = require("passport");
var jwt = require('jsonwebtoken');
var secret = '6ab198087a16e6d49b438a7aa514731f';/**
 * AuthoController
 *
 * @description :: Server-side logic for managing Authoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
                    console.log(user);
            if ((err) || (!user)) {
                res.send({
                    error: err,
                });
                return; 
            };
            if (user == false) {
            	res.send({
            		error: info,
            	});
            }else{                  
                    var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
                    return res.status(200).json({
                        user: user,
                        token: token
                    });
            }
        })(req, res);
    },
// Redirect to fb for authentication
    facebook: function(req, res) {
        passport.authenticate('facebook')(req, res);
    },
// Callback from fb authentication and issue access_token
    facebook_callback: function(req, res) {
        passport.authenticate('facebook', function (err, user, info) {
            var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
            res.send({
                success: true,
                user: user,
                token: token
            })
        })(req,res);
    },

    logout: function(req, res) {
        req.logout();
        return res.status(204).json({
            message: 'logoutSuccessful'
        });
    },
    _config: {}

};

