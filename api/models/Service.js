/**
* Service.js
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
        name:"Personal chef",
        verified: true
      },
      {
        name:"Decoration artist",
        verified: true
      },
      {
        name:"Musician",
        verified: true
      },
      {
        name:"Cleaner",
        verified: true
      },
      {
        name:"Master of ceremony (MC)",
        verified: true
      },
      {
        name:"Cake",
        verified: true
      },
      {
        name:"Personal shopper",
        verified: true
      },
      {
        name:"Private teacher",
        verified: true
      },
      {
        name:"Baby sitter",
        verified: true
      }
    ]
};

