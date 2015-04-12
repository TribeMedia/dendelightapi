var passport = require("passport");
var jwt = require('jsonwebtoken');
var secret = sails.config.session.secret;
var TEST_ID = sails.config.stripe.testClientId;
var TEST_SECRET = sails.config.stripe.testSecretKey;
var request = require("request");
/**
 * AuthController
 *
 */

module.exports = {
  //User confirm 
  user_confirm: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No user id provided.');
      };

    User.update(id, {verified: true}, function (err, user) {
      if(user.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({user: user});
    });
  },
    
  // Provider confirm
  provider_confirm: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No provider id provided.');
    };

    Provider.update(id, {verified: true}, function (err, provider) {
      if(provider.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({provider: provider});
    });
  },

  // User login with passport local
  user_login: function(req, res) {
    passport.authenticate('user-local', function(err, user, info) {
      if ((err) || (!user)) {
        res.badRequest(err);
        
        return; 
      };
      
      if (user === false) {
        res.badRequest(info);
      } else {                  
        var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
        
        return res.ok({
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
        res.badRequest(err);
        
        return; 
      };
      
      if (provider === false) {
        res.notFound;
      } else {                  
        var token = jwt.sign(provider, secret, { expiresInMinutes: 60*24 });
        
        return res.ok({
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
        res.badRequest(err);
        
        return; 
      };
      
      if (admin === false) {
        res.notFound;
      } else {                  
        var token = jwt.sign(admin, secret, { expiresInMinutes: 60*24 });
        
        return res.ok({
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
    passport.authenticate('facebook', { failureRedirect: '/api/v1/user_login' }, function (err, user, info) {
      var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
      console.log(user);
      if (err) return res.badRequest(err);

      res.ok({
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
            res.badRequest(err);
          } else {
            var access_token = JSON.parse(body).access_token;
            var stripe_user_id = JSON.parse(body).stripe_user_id;
            var refresh_token = JSON.parse(body).refresh_token;
          
            Provider.update({email: user_email}, {stripe_access_token: access_token, stripe_user_id: stripe_user_id, stripe_refresh_token: refresh_token}, function (err, provider) {

            if(occasion.length === 0) return res.notFound;

            if (err) return res.badRequest(err);

            res.ok({provider: provider});

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

