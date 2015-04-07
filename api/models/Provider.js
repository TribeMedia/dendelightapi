/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	email: {
  		type: 'string',
  		unique: true,
  		required: true
  	},
  	password: {
  		type: 'string',
  		required: true,
  		minLength: 6
  	},
    firstname: {
      type: 'string',
    },
    lastname: {
      type: 'string',
    },
    businessname: {
      type: 'string',
    },
  	access_token: {
  		type: 'string'
  	},
    service: {
      type: 'string',
    },
    verified: {
      type: 'boolean',
      defaultsTo: false
    },
    stripe: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  beforeCreate: function (attrs, next) {
  	var bcrypt = require('bcryptjs');
  	var jwt = require('jsonwebtoken');
  	
  	bcrypt.genSalt(10, function(err, salt) {
  		if (err) return next(err);

  		bcrypt.hash(attrs.password, salt, function(err, hash) {
  			if (err) return next(err);

  			attrs.password = hash;
  			next();
  		});
  	});
  },

  afterCreate: function (attrs, next) {
    var nodemailer = require('nodemailer');

    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tuiqwe@gmail.com',
            pass: 'dutevcyvlexpmhva'
        }
    });

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'tuiqwe@gmail.com', // sender address
        to: attrs.email, // list of receivers
        subject: 'Welcome', // Subject line
        text: 'Welcome', // plaintext body
        html: 'http://localhost:1337/api/v1/confirm/' + attrs.id // html body
    };


    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });  }
};

