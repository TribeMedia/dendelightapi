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
  		required: true,
      string: true
  	},
    type: {
      type: 'string',
      unique: true,
      required: true,
      string: true
    },
    duration: {
      type: 'float',
      required: true,
      float: true
    },
    price: {
      type: 'integer',
      required: true,
      integer: true,
      min: 10,
      max: 200
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

