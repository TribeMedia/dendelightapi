/**
* ProviderNotification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	providerId: {
  		type: 'string'
  	}, 
  	quoteId: {
  		type: 'string'
  	},
    bookingId: {
      type: 'string'
    },
    service: {
      type: 'string'
    },
    mes: {
      type: 'string'
    },
    read: {
      type: 'boolean',
      defaultsTo: false
    }
  },
};

