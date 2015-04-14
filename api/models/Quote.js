/**
* Quote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	service: {
  		type: 'string',
  		required: true
  	},
  	price: {
  		type: 'string',
      required: true
  	},
    bookingId: {
      type: 'string',
      required: true
    },
    providerId: {
      type: 'string',
      required: true
    },
    serviceTime: {
  		type: 'dateTime'
  	},
    serviceDuration: {
      type: 'integer'
    },
    accepted: {
      type: 'boolean',
      defaultsTo: false,
    }
  },
};

