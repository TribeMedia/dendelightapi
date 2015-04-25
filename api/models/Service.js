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
  		required: true
  	},
    type: {
      type: 'string',
      unique: true,
      required: true
    },
    duration: {
      type: 'integer',
      required: true
    },
    price: {
      type: 'integer',
      required: true
    }
  },
  seedData:[
      {
        name:'mowing',
        type: 'small',
        duration: 2,
        price: 50
      },
      {
        name:'mowing',
        type: 'medium',
        duration: 3,
        price: 75
      },
      {
        name:'mowing',
        type: 'large',
        duration: 4,
        price: 100
      }
    ]
};

