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
  		required: true,
      string: true
  	},
    providerId: {
      type: 'string',
      required: true,
      string: true
    }, 
    bookTime: {
      type: 'float',
      required: true,
      float: true
    },
    estimatedDuration: {
      type: 'float',
      required: true,
      float: true
    },
    location: {
      type: 'json',
      index:'2dsphere',
      required: true
    },
  	services: {
  		type: 'array',
  		required: true,
      array: true
  	},
    price: {
      type: 'interger',
      integer: true,
      min: 10,
      max: 200
    },
    completed: {
      type: 'boolean',
      defaultsTo: false
    }
  },

};

