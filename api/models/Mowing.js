/**
* Mowing.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	lowerSize: {
  		type: 'integer',
  		required: true
  	},
    upperSize: {
      type: 'interger',
      required: true
    },
    duration: {
      type: 'integer',
      defaultsTo: true
    }
  },
};

