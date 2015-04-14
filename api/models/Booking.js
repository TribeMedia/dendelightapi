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
  		type: 'string'
  	}, 
  	quoteId: {
  		type: 'string'
  	},
  	service: {
  		type: 'string',
  		required: true
  	},
  	postcode: {
  		type: 'number'
  	},
  	bookTime: {
  		type: 'dateTime'
  	},
  	repeat: {
  		type: 'string',
  		defaultsTo: null
  	},
  	duration: {
  		type: 'string'
  	},
    completed: {
      type: 'boolean',
      defaultsTo: false,
    }
  },
};

