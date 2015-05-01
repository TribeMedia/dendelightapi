// Service provider model
module.exports = {

  attributes: {
  	email: {
  		type: 'email',
  		unique: true,
  		required: true,
      email: true,
      protected: true
  	},
  	password: {
  		type: 'string',
  		required: true,
      string: true,
  		minLength: 6,
      protected: true
  	},
    firstName: {
      type: 'string',
      required: true,
      maxLength: 15,
      alpha: true
    },
    lastName: {
      type: 'string',
      required: true,
      maxLength: 15,
      alpha: true
    },
    fullName: function() {
      return this.firstName + ' ' + this.lastName
    },
    businessName: {
      type: 'string',
      maxLength: 20,
      string: true
    },
    address: {
      type: 'string',
      maxLength: 30,
      required: true,
      string: true
    },
    postcode: {
      type: 'integer',
      required: true,
      min: 0,
      max: 10000
    },
    location: {
      type: 'json',
      index:'2dsphere',
      required: true
    },
    service: {
      type: 'array',
      array: true
    },
    verified: {
      type: 'boolean',
      defaultsTo: false
    },
    abn: {
      type: 'string',
      required: true,
      alphanumeric: true,
      minLength: 11,
      maxLength: 11
    },
    stripe_account: {
      type: 'boolean',
      defaultsTo: false,
      protected: true
    },
    stripeId: {
      type: 'string',
      string: true,
      unique: true,
      protected: true
    },
    schedule: {
      type: 'array',
      array: true,
      protected: true
    },
    accessToken: {
      type: 'string',
      string: true,
      protected: true
    }
    
  },

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

  // afterCreate: function (attrs, next) {
  //   var nodemailer = require('nodemailer');

  //   // create reusable transporter object using SMTP transport
  //   var transporter = nodemailer.createTransport({
  //       service: 'Gmail',
  //       auth: {
  //           user: 'tuiqwe@gmail.com',
  //           pass: 'dutevcyvlexpmhva'
  //       }
  //   });

  //   // NB! No need to recreate the transporter object. You can use
  //   // the same transporter object for all e-mails

  //   // setup e-mail data with unicode symbols
  //   var mailOptions = {
  //       from: 'tuiqwe@gmail.com', // sender address
  //       to: attrs.email, // list of receivers
  //       subject: 'Welcome', // Subject line
  //       text: 'Welcome', // plaintext body
  //       html: 'http://localhost:1337/api/v1/provider_confirm/' + attrs.id // html body
  //   };


  //   // send mail with defined transport object
  //   transporter.sendMail(mailOptions, function(error, info){
  //       if(error){
  //           console.log(error);
  //       }else{
  //           console.log('Message sent: ' + info.response);
  //       }
  //   });
  // }
  
};

