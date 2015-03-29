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
      defaultsTo: false,
    }
  },
  seedData:[
      {
        size:"1 to 5",
        verified: true
      },
      {
        size:"6 to 10",
        verified: true
      },
      {
        size:"11 to 20",
        verified: true
      },
      {
        size:"21 - 50",
        verified: true
      },
      {
        size:"> 50",
        verified: true
      }
    ]
};

