module.exports = {

  // Search and return a list of provider id whom can't provide service
  searchBusyProvider: function (lng, lat, service, bookTime) {
	  
    return new Promise(function(resolve, reject) {
	        
	  Provider.native(function(err, provider){
	    provider.geoNear(lng, lat, { maxDistance: 10000, query: {'service': {$all: service}, 'schedule.startTime': {$lte: bookTime}, 'schedule.endTime': {$gt: bookTime}}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
	      if (mongoErr) { reject(mongoErr)}; 
	      if (providers.results.length === 0) {
	        resolve([]);
	      } else {
	        async.map(providers.results,
	          function (result, callback) {
	            callback (null, result.obj._id);
	          },
	          function (err, results) {
	            if (err) { reject(err); };
	            if (results) { resolve(results) };
	          }
	        );
	      };
	    });              
	  });

	})
  },

  // Search and return at max 3 providers who can perform the job
  searchFreeProvider: function (lng, lat, service, bookTime, ids) {
	  
	return new Promise(function(resolve, reject) {
	        
	  Provider.native(function(err, provider){
	    provider.geoNear(lng, lat, { limit: 3, maxDistance: 10000, query: {'_id': {$nin: ids},'service': {$all: service}}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
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

  // Update provider schedule to provide a task. NOTE: id is ObjectID
  updateProviderAddSchedule: function (id, bookTime, endTime) {

	return new Promise(function(resolve, reject) {

      Provider.native(function(err, provider) {
        provider.update({_id: id}, {$push: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err, error) {
          if (err) { reject(err);
          } else { resolve(id); };
	    });
	  });

	})
  },

  // Remove a time slot from schedule. NOTE: id is ObjectID
  updateProviderRemoveSchedule: function (id, bookTime, endTime) {

	return new Promise(function(resolve, reject) {

      Provider.native(function(err, provider) {
        provider.update({_id: id}, {$pull: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err, error) {
          if (err) { 
          	reject(err); 
	      } else { 
	        resolve(id); 
	      };
	    });
	  });
	})
  },

  // Update services in Bookings with bookingId
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

  // Update services in Bookings with providerId
  updateServiceWithProviderID: function (providerId, booking) {

    return new Promise(function(resolve, reject) {
	  async.map(booking.services, function (service, callback) {

	    if (service.name === 'mowing') {
	      Mowing.update(service.id, {providerId: providerId}, function(err, service) {
	        callback(null, service);
	      });
	    } else if (service.name === 'leaf_removal') {
	      LeafRemoval.update(service.id, {providerId: providerId}, function(err, service) {
	        callback(null, service);
	      });
	    } else if (service.name === 'weed_control') {
	      WeedControl.update(service.id, {providerId: providerId}, function(err, service) {
	        callback(null, service);
	      });
	    } else if (service.name === 'yard_cleaning') {
	      YardCleaning.update(service.id, {providerId: providerId}, function(err, service) {
	        callback(null, service);
	      });
	    }

	  }, function (err, results) {
	    if (err) { reject(err)};
	    if (results) {resolve({booking: booking, services: results});};
	  });

	})
  },

  // Search for service (like mowing, etc...)
  searchServiceWithId: function (name, id) {

	return new Promise(function(resolve, reject) {
      if (name === 'mowing') {
        Mowing.findOne(id, function(err, service) {
          if (err) { reject(err) } else if (service) { resolve(service) };
        });
      } else if (name === 'leaf_removal') {
        LeafRemoval.findOne(id, function(err, service) {
          if (err) { reject(err) } else if (service) { resolve(service) };
        });
      } else if (name === 'weed_control') {
        WeedControl.findOne(id, function(err, service) {
          if (err) { reject(err) } else if (service) { resolve(service) };
        });
      } else if (name === 'yard_cleaning') {
        YardCleaning.findOne(id, function(err, service) {
          if (err) { reject(err) } else if (service) { resolve(service) };
        });
      }
	})
  },

  // Search for services in Booking list
  searchServiceInBookings: function (bookings) {

	return new Promise(function(resolve, reject) {
  	  async.map(bookings, 
  	  	function (booking, callback) {
  	  	  async.map(booking.services,
  	  	  	function (service, callback) {
              Queries.searchServiceWithId(service.name, service.id)
                .then(function(service) {
                  callback(null, service);
                })
                .catch(function(err) {
                  callback(err);
                })
  	  	  	},
  	  	  	function (err, results) {
  	  	  	  if (err) callback(err);	
  	  	  	  booking['info'] = results;
  	  	  	  callback(null, booking);
  	  	  	}
  	  	  	)
		  },
		  function (err, results) {
		  	if (err) { 
		  	  reject(err);
		  	} else {
	 	  	 resolve(results);
	 	  	}	
  	  	  }
  	  	)
  	})
  }
}