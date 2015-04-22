/**
* Mowing.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    bookingId: {
      type: 'string',
      required: true
    },
    providerId: {
      type: 'string',
      required: true
    }, 
    estimatedSize: {
      type: 'string',
      required: true
    },
    realSize: {
      type: 'string'
    },
    postcode: {
      type: 'integer',
      required: true
    },
    lat: {
      type: 'float',
      required: true
    },
    lng: {
      type: 'float',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    bookTime: {
      type: 'float'
    },
    estimatedDuration: {
      type: 'float'
    },
    startTime: {
      type: 'float'
    },
    endTime: {
      type: 'float'
    },
    realDuration: function () {
      return (this.endTime - this.startTime);
    },
    wage: {
      type: 'integer',
      required: true
    },
    estimatedPrice: function () {
      return (this.estimatedDuration * 360000 * wage);
    },
    price: function () {
      return (this.realDuration * 360000 * wage);
    },
    repeat: {
      type: 'string',
      defaultsTo: null
    },
    completed: {
      type: 'boolean',
      defaultsTo: false,
    }
  },
};

