/**
* Booking.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	userId: {
  		type: 'string',
  		required: true
  	},
  	services: {
  		type: 'array',
  		required: true
  	},
  },

  afterCreate: function (attrs, next) {
    async.map(attrs.services, function (service, callback) {
      function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      };

      capitalizeFirstLetter(service.name).findOne({id: service.id}).exec(function(err, service) {
        if (err) { console.log(err) };
      });

      callback(null, true);  

    }, function (err, results) {
      if (err) { console.log(err)};
      next();
    });
  },

};

