var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
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
        }; 
        if (!user) {
          return done(null, false, {
            message: 'Incorrect User'
          });
        } else {
          bcrypt.compare(password, user.password, function(err, res) {
            if (!res) {
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
        };

        if (!provider) {
          return done(null, false, {
            message: 'Incorrect Provider'
          });
        } else {
          bcrypt.compare(password, provider.password, function(err, res) {
            if (!res) {
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

// Admin auth for service admin
passport.use('admin-local', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      Admin.findOne({email: email}, function(err, admin) {
        if (err) {
          return done(err, null);
        };

        if (!admin) {
          return done(null, false, {
            message: 'Incorrect Admin'
          });
        } else {
          bcrypt.compare(password, admin.password, function(err, res) {
            if (!res) {
              return done(null, false, {
                message: 'Invalid Password'
              });
            } else {
              return done(null, admin);
            }
          });
        }
      });
    })
);

// Facebook auth only work online
passport.use(new FacebookStrategy({
    clientID: '1727951520764760',
    clientSecret: 'b6033191cfad82890dbc2162e9976839',
    callbackURL: "http://oseam.herokuapp.com/api/v1/auth/facebook/callback",
    profileFields: ['email', 'id', 'displayName', 'photos']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.email}, function(err, user) {
      if (err) return done(err, null);
      if (!user) {
        User.create({
          apiProvider: 'Facebook',
          email: profile.email,
          password: profile.id,
        }, function (err, user) {
          if (user) {
            return done(null, user);
          } else {
            return done(err, null);
          }
        });
      };

      if (user) {
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