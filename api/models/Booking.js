/**
* Booking.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	userId: {
  		type: 'string',
  		required: true,
      string: true
  	},
    providerId: {
      type: 'string',
      required: true,
      string: true
    }, 
    bookTime: {
      type: 'float',
      required: true,
      float: true
    },
    estimatedDuration: {
      type: 'float',
      required: true,
      float: true
    },
    location: {
      type: 'json',
      index:'2dsphere',
      required: true
    },
    mowing: {
      model: 'Mowing'
    },
    leafRemoval: {
      model: 'LeafRemoval'
    },
    weedControl: {
      model: 'WeedControl'
    },
    yardCleaning: {
      model: 'YardCleaning'
    },
    services: {
      type: 'array'
    },
    price: {
      type: 'interger',
      integer: true,
      min: 10,
      max: 200
    },
    completed: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  afterDestroy: function(deletedRecords, next) {
    async.each(deletedRecords, function(booking, callback) {
        async.parallel([
            function(callback){
              if (booking.mowing) {
                Mowing.destroy(booking.mowing.id, function(err) {
                  if (err) { callback(err);
                  } else { callback(null); };
                });
              };
            },
            function(callback){
              if (booking.leafRemoval) {
                LeafRemoval.destroy(booking.leafRemoval.id, function(err) {
                  if (err) { callback(err);
                  } else { callback(null); };                
                });
              }; 
            },
            function(callback){
              if (booking.weedControl) {
                WeedControl.destroy(booking.weedControl.id, function(err) {
                  if (err) { callback(err);
                  } else { callback(null); };                
                });
              }; 
            },
            function(callback){
              if (booking.yardCleaning) {
                YardCleaning.destroy(booking.yardCleaning.id, function(err) {
                  if (err) { callback(err);
                  } else { callback(null); };                
                });
              }; 
            },
        ],
        function(err, results){
          if (err) { callback(err);
          } else {
            callback();
          }
        });
      }, function(err) {
        if (err) {
          next(err);
        } else {
          next;
        } 
      });
  }
};

