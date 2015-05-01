/**
* ProviderNotification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	providerId: {
  		type: 'string',
      string: true
  	}, 
    serviceId: {
      type: 'string',
      string: true
    },
    serviceName: {
      type: 'string',
      string: true
    },
    mes: {
      type: 'string',
      string: true
    },
    read: {
      type: 'boolean',
      defaultsTo: false
    }
  },
};

