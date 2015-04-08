var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;
    bcrypt = require('bcryptjs');
// Passport auth for user
passport.use('user-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
    function(email, password, done) {
        User.findOne({email: email}, function(err, user) {
            if (err) {
                return done(err, null);
            } 
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect User'
                });
            } else {
                bcrypt.compare(password, user.password, function(err, res) {
                    if (err) {
                        return done(null, false, {
                            message: 'Invalid Password'
                        });
                    } else {
                        return done(null, user);
                    }
                });
            }
        });
    })
);
// Passport auth for service provider
passport.use('provider-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
    function(email, password, done) {
        Provider.findOne({email: email}, function(err, provider) {
            if (err) {
                return done(err, null);
            } 
            if (!provider) {
                return done(null, false, {
                    message: 'Incorrect Provider'
                });
            } else {
                bcrypt.compare(password, provider.password, function(err, res) {
                    if (err) {
                        return done(null, false, {
                            message: 'Invalid Password'
                        });
                    } else {
                        return done(null, provider);
                    }
                });
            }
        });
    })
);
// Facebook auth only work online
passport.use(new FacebookStrategy({
    clientID: '1719770144916231',
    clientSecret: 'd111e359635a625f8d40b3e04218c7a3',
    callbackURL: "http://oseam.co/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.email}, function(err, user) {
      if (err) { return done(err, null); }
      if (!user) {
        User.create({
            provider: Facebook,
            email: profile.email,
            password: profile.id,
        }).done(function (err, user) {
            if (user) {
                return done(null, user, {
                  message: 'Logged In Successfully'
                });
            } else {
                return done(err, null, {
                  message: 'There was an error logging you in with Facebook'
                });
            }
        });
      } else {
        return done(null, user);
      }
    });
  }
));

module.exports = {
    http: {
        customMiddleware: function(app) {
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};