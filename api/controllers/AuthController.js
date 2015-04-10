var passport = require("passport");
var jwt = require('jsonwebtoken');
var secret = '6ab198087a16e6d49b438a7aa514731f';
var TEST_ID = 'ca_60rzt4IsHzlWikredHVTxZHAlNDhDvaC';
var TEST_SECRET = 'sk_test_oPJOrwhkdFhK8pWfMRLXBaqv';
var request = require("request");
/**
 * AuthController
 *
 */

module.exports = {
  //User confirm 
  user_confirm: function (req, res, next) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
      };

    User.update(id, {verified: true}, function (err, user) {
      if(user.length === 0) return res.notFound();

      if (err) return next(err);

      res.status(200).json(user);
    });
  },
    
  // Provider confirm
  provider_confirm: function (req, res, next) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };

    Provider.update(id, {verified: true}, function (err, provider) {
      if(provider.length === 0) return res.notFound();

      if (err) return next(err);

      res.status(200).json({provider: provider});
    });
  },

  // User login with passport local
  user_login: function(req, res) {
    passport.authenticate('user-local', function(err, user, info) {
      if ((err) || (!user)) {
        res.status(400)
          .json({
            error: err
          });
        
        return; 
      };
      
      if (user == false) {
        res.status(400)
          .json({
            error: info
          });
      } else {                  
        var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
        
        return res.status(200).json({
          user: user,
          token: token
        });
      }
    })(req, res);
  },

  // Service provider login with passport local
  provider_login: function(req, res) {
    passport.authenticate('provider-local', function(err, provider, info) {
      if ((err) || (!provider)) {
        res.status(400)
          .json({
            error: err
          });
        
        return; 
      };
      
      if (provider === false) {
        res.status(400)
          .json({
            error: info
          });
      } else {                  
        var token = jwt.sign(provider, secret, { expiresInMinutes: 60*24 });
        
        return res.status(200).json({
          provider: provider,
          token: token
        });
      }
    })(req, res);
  },

  // Admin login with passport local
  admin_login: function(req, res) {
    passport.authenticate('admin-local', function(err, admin, info) {
      if ((err) || (!admin)) {
        res.status(400)
          .json({
            error: err
          });
        
        return; 
      };
      
      if (admin === false) {
        res.status(400)
          .json({
            error: info
          });
      } else {                  
        var token = jwt.sign(admin, secret, { expiresInMinutes: 60*24 });
        
        return res.status(200).json({
          admin: admin,
          token: token
        });
      }
    })(req, res);
  },

  // Redirect to fb for authentication. User only
  facebook: function(req, res) {
    passport.authenticate('facebook')(req, res);
  },

  // Callback from fb authentication and issue access_token. User Only
  facebook_callback: function(req, res) {
    passport.authenticate('facebook', function (err, user, info) {
      var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
      
      res.status(200)
        .json({
          success: true,
          user: user,
          token: token
        });
    })(req,res);
  },

  // Redirect to Stripe /oath/authorize endpoint. Provider Only
  stripe: function(req, res) {
    res.redirect('https://connect.stripe.com/oauth/authorize?' + qs.stringify({
      response_type: 'code',
      scope: 'read_write',
      client_id: TEST_ID,
      state: req.email
    })
    );
  },

  // Callback from Stripe. Provider Only
  stripe_callback: function(req, res) {
    var code = res.code;
    var user_email = res.state;
    
      // Make /oauth/token endpoint POST request
      request.post({
        url: 'https://connect.stripe.com/oauth/token',
          form: {
            grant_type: 'authorization_code',
            client_id: TEST_ID,
            code: code,
            client_secret: TEST_SECRET
          }
        }, function(err, r, body){
          if (err) {
            res.status(400).json(err);
          } else {
            var access_token = JSON.parse(body).access_token;
            var stripe_user_id = JSON.parse(body).stripe_user_id;
            var refresh_token = JSON.parse(body).refresh_token;
          
            Provider.update({email: user_email}, {stripe_access_token: access_token, stripe_user_id: stripe_user_id, stripe_refresh_token: refresh_token}, function (err, provider) {

            if(occasion.length === 0) return res.status(404);

            if (err) return res.status(400).json(err);

            res.status(200).json(occasion_size);

        });
      }
    })

  },

  // For both User and Provider. Clear access_token after receive '204' status
  logout: function(req, res) {
    req.logout();
    
    return res.status(204).json({
        message: 'logoutSuccessful'
    });
  },
    
    _config: {}

};

