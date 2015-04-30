/**
* Admin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	email: {
  		type: 'email',
  		unique: true,
  		required: true
  	},
    password: {
      type: 'string',
      required: true,
    },
    accessToken: {
      stype: 'string'
    }
  },
  seedData:[
      {
        email:"vuongngo.pd@gmail.com",
        password: "admin12345"
      },
    ],

  beforeCreate: function (attrs, next) {
    var bcrypt = require('bcryptjs');
    var jwt = require('jsonwebtoken');
    
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      // Hash password
      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.password = hash;
        next();
      });
    });
  },
  
};

