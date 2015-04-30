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
    providerId: {
      type: 'string',
      required: true
    }, 
    bookTime: {
      type: 'float'
    },
    estimatedDuration: {
      type: 'float'
    },
    location: {
      type: 'json',
      index:'2dsphere',
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

};

