/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
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
        name:"B-day",
        verified: true
      },
      {
        name:"Family gathering",
        verified: true
      },
      {
        name:"Just for fun!",
        verified: true
      },
      {
        name:"A date",
        verified: true
      },
      {
        name:"Kinder party",
        verified: true
      },
      {
        name:"Culture induction",
        verified: true
      }
    ]
};

