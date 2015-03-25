var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({email: email}).done(function(err, user) {
            if (err) {
                return done(err, null);
            } else if (!user) {
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

module.exports = {
    http: {
        customMiddleware: function(app) {
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};