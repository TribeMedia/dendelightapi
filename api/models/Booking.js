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
    price: {
      type: 'interger'
    },
    completed: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  afterCreate: function (attrs, next) {
    async.map(attrs.services, function (service, callback) {

      if (service.name === 'mowing') {
        Mowing.update(service.id, {bookingId: attrs.id}, function(err, service) {
          callback(null, true);
        });
      } else if (service.name === 'leaf_removal') {
        LeafRemoval.update(service.id, {bookingId: attrs.id}, function(err, service) {
          callback(null, true);
        });
      } else if (service.name === 'weed_control') {
        WeedControl.update(service.id, {bookingId: attrs.id}, function(err, service) {
          callback(null, true);
        });
      } else if (service.name === 'yard_cleaning') {
        YardCleaning.update(service.id, {bookingId: attrs.id}, function(err, service) {
          callback(null, true);
        });
      }

    }, function (err, results) {
      if (err) { console.log(err)};
      next();
    });
  },

};

