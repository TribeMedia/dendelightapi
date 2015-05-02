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
        name: 'mowing',
        type: 'small',
        duration: 720000,
        price: 50
      },
      {
        name: 'mowing',
        type: 'medium',
        duration: 1080000,
        price: 75
      },
      {
        name: 'mowing',
        type: 'large',
        duration: 1440000,
        price: 100
      },
      {
        name: 'leaf_removal',
        type: 'two trees',
        duration: 360000,
        price: 30
      },
      {
        name: 'leaf_removal',
        type: 'three trees',
        duration: 540000,
        price: 45
      },
      {
        name: 'leaf_removal',
        type: 'four trees',
        duration: 720000,
        price: 60
      },
      {
        name: 'yard_cleaning',
        type: 'small',
        duration: 360000,
        price: 25
      },
      {
        name: 'yard_cleaning',
        type: 'medium',
        duration: 720000,
        price: 50
      },
      {
        name: 'yard_cleaning',
        type: 'large',
        duration: 1080000,
        price: 75
      },
    ]
};

