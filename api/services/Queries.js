module.exports = {

    searchProviderBusy: function (lng, lat, serviceName, bookTime) {
      
      return new Promise(function(resolve, reject) {
            
        Provider.native(function(err, provider){
          provider.geoNear(lng, lat, { maxDistance: 10000, query: {'service': serviceName, 'schedule.startTime': {$lte: bookTime}, 'schedule.endTime': {$gt: bookTime}}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
            if (mongoErr) { reject(mongoErr)}; 
            console.log(providers);
            if (providers.results.length === 0) {
              resolve([]);
            } else {
              async.map(providers.results,
                function (result, callback) {
                  callback (result.obj._id);
                },
                function (err, results) {
                  if (err) { reject(err); };
                  console.log(results);
                  if (results) { resolve(results) };
                }
                );
            };
          });              
        });

      })
    },

    searchProviderFree: function (lng, lat, serviceName, bookTime, ids) {
      
      return new Promise(function(resolve, reject) {
            
        Provider.native(function(err, provider){
          provider.geoNear(lng, lat, { limit: 1, maxDistance: 10000, query: {'_id': {$nin: ids},'service': serviceName}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
            if (mongoErr) { reject(mongoErr);  
            } else if (providers.results.length === 0) {
              reject('Provider not found');
            } else {
              resolve(providers);
            }
          });              
        });

      })
    },

    updateFreeProvider: function (id, bookTime, endTime) {

    	return new Promise(function(resolve, reject) {

          Provider.native(function(err, provider) {
            provider.update({_id: id}, {$push: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err, provider) {
            	if (err) { reject(err)};
            	if (provider) { resolve(provider)};
            });
          });

    	})
    },

    updateServiceWithBookingID: function (booking) {

      return new Promise(function(resolve, reject) {
        async.map(booking.services, function (service, callback) {

          if (service.name === 'mowing') {
            Mowing.update(service.id, {bookingId: booking.id}, function(err, service) {
              callback(null, service);
            });
          } else if (service.name === 'leaf_removal') {
            LeafRemoval.update(service.id, {bookingId: booking.id}, function(err, service) {
              callback(null, service);
            });
          } else if (service.name === 'weed_control') {
            WeedControl.update(service.id, {bookingId: booking.id}, function(err, service) {
              callback(null, service);
            });
          } else if (service.name === 'yard_cleaning') {
            YardCleaning.update(service.id, {bookingId: booking.id}, function(err, service) {
              callback(null, service);
            });
          }

        }, function (err, results) {
          if (err) { reject(err)};
          if (results) {resolve({booking: booking, services: results});};
        });

      })
    },

}