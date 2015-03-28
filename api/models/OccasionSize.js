/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	size: {
  		type: 'string',
  		unique: true,
  		required: true
  	},
    verified: {
      type: 'boolean',
      default: false,
    }
  },

};

