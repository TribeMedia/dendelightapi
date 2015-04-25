/**
 * TaskController.js
 *
 */

module.exports = {

  // View task Provider
  provider_task: function (req, res) {
    var params = req.params.all();
    params['providerId'] = req.provider.id;

    Provider.findOne(params['providerId'], function (err, provider) {
      if (err) return res.notFound();

      async.parallel([
        function (callback) {
      	  if (provider.service.indexOf('mowing') >= 0) {
      	  	Mowing.find(params, function (err, mowings) {
  	  		  if (err) {
  	  		  	callback(false);
  	  		  } else {
  	  		  	callback(null, mowings);
  	  		  }
      	  	})
      	  } else {
      	  	callback(false);
      	  }
        },
        function (callback) {
      	  if (provider.service.indexOf('leaf removal') >= 0) {
      	  	LeafRemoval.find(params, function (err, leafremovals) {
  	  		  if (err) {
  	  		  	callback(false);
  	  		  } else {
  	  		  	callback(null, leafremovals);
  	  		  }
      	  	})
      	  } else {
      	  	callback(false);
      	  }
        },
        function (callback) {
      	  if (provider.service.indexOf('weed control') >= 0) {
      	  	WeedControl.find(params, function (err, weedcontrols) {
  	  		  if (err) {
  	  		  	callback(false);
  	  		  } else {
  	  		  	callback(null, weedcontrols);
  	  		  }
      	  	})
      	  } else {
      	  	callback(false);
      	  }
        },
        function (callback) {
      	  if (provider.service.indexOf('yard cleaning') >= 0) {
      	  	YardCleaning.find(params, function (err, yardcleanings) {
  	  		  if (err) {
  	  		  	callback(false);
  	  		  } else {
  	  		  	callback(null, yardcleanings);
  	  		  }
      	  	})
      	  } else {
      	  	callback(false);
      	  }
        }
        ],
        function (err, results) {
          if (err) { return res.notFound();
          } else {
	        var arr = [];
	        results.forEach(function (element, index, array) {
	            if (element != null) {
	        	  arr = arr.concat(element);
	            };	
	          });
            arr.sort(function(a, b) { return parseFloat(a.bookTime) - parseFloat(b.bookTime)});
            res.ok(arr);
  		  }	
        }
      )

    })
  },

  // Reject tasks
  reject_task: function (req, res) {
	var providerId = req.provider.id;
	var taskId = req.param('id');
	var params = req.params.all();
	var newProviderId;

    if (params.taskName === 'mowing') {
  	  Mowing.findOne(taskId, function (err, task) {
	  	if (err) return res.notFound(err);
  		updateTask(task);
  	  })
    }  else if (params.taskName === 'leaf removal') {
  	  LeafRemoval.findOne(taskId, function (err, task) {
	  	if (err) return res.notFound(err);
  		updateTask(task);
  	  })
    }  else if (params.taskName === 'weed control') {
  	  WeedControl.findOne(taskId, function (err, task) {
	  	if (err) return res.notFound(err);
  		updateTask(task);
  	  })
    }  else if (params.taskName === 'yard cleaning') {
  	  YardCleaning.findOne(taskId, function (err, task) {
	  	if (err) return res.notFound(err);
  		updateTask(task);
  	  })
    };	
  
	function updateTask (task) {
	  console.log(task);
	  var bookTime = task.bookTime;
	  var estimatedDuration = task.estimatedDuration;
	  async.series([
        function (callback) {
          Provider.findOne(providerId, function (err, provider) {
            var index = provider.schedule.indexOf({startTime: bookTime, endTime: (bookTime + estimatedDuration)})
            provider.schedule.splice(index, 1);
            provider.save(function (err) {
              if (err)  { callback(err); 
              } else {
                callback(null);
              };
            })
          })
        },
        function (callback) {
          Provider.native(function(err, provider) {
          	var ObjectID = require('mongodb').ObjectID;
          	var oldId = ObjectID(providerId);
          	var lng = task.location.coordinates[0];
          	var lat = task.location.coordinates[1];

            async.waterfall([
              function (callback) {
                provider.geoNear(lng, lat, { maxDistance: 10000, query: {'service': task.name, 'schedule.startTime': {$lt: bookTime}, 'schedule.endTime': {$gt: bookTime}}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
                  if (mongoErr) callback(mongoErr);

                  if (providers.results.length === 0) {
                    callback(null, [oldId]);
                  } else {
                    async.map(providers.results,
                      function (result, callback) {
                        callback (result.obj._id);
                      },
                      function (err, results) {
                        if (err) { callback(err); };
                        callback(null, results.concat(oldId));
                      }
                      );
                  };
                });
              },
              function (ids, callback) {
                provider.geoNear(lng, lat, { limit: 1, maxDistance: 10000, query: {'_id': {$nin: ids},'service': task.name}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {

	              if (mongoErr) return callback(mongoErr);

	              if (providers.results.length === 0) {
					task.providerId = null;
					task.save(function (err) {
					  if (err) return callback(err);              	

		              var adminNotification = {providerId: task.providerId, serviceId: task.id, serviceName: task.namme, mes: 'Service vacant is emplty!!! Need new provider imediatly'}
	                  var nsp = sails.io.of('/admin');
	                  nsp.on('connection', function(socket) {
	                    socket.emit('notification', adminNotification);
	                  });

	             	  callback('No provider found');
	             	})
	              };
	              
	              if (providers.results[0]) { 
	                var estimatedDuration = task.estimatedDuration;
	                id = providers.results[0].obj._id;
	                endTime = task.bookTime + estimatedDuration;
	                provider.update({_id: id}, {$push: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err) {
	                  task.providerId = id.toString();
	                  task.save(function (err) {
	                  	if (err) callback(err);
		                ProviderNotification.create({providerId: task.providerId, serviceId: task.id, serviceName: task.name}, function (err, providernote) {
		                  if (err) console.log(err);
		                  var nsp = sails.io.of('/provider_' + providernote.providerId);
		                  nsp.on('connection', function(socket) {
		                    socket.emit('notification', providernote);
		                  });

	                 	  callback(null);

		                });
	                  })

	                });
	              };

                })
              }
            ],
            function (err, result) { 
              if (err) { callback(err); };
              callback(null, task);
            })
          });

        }],
        function (err, results) {
          if (err) return res.badRequest();

          res.ok(results[0]);
        }
      );
	};
  },

  // User view booking
  view_booking: function (req, res) {
  	var userId = req.user.id;
  	console.log(userId);
  	var params = req.params.all();
  	console.log(params);
  	params['userId'] = userId;
  	console.log(params);

  	Booking.find(params, function (err, bookings) {
  	  if (err) return res.notFound();

  	  async.map(bookings, 
  	  	function (booking, callback) {
  	  	  async.map(booking.services,
  	  	  	function (service, callback) {
  	  	  	  if (service.name === 'mowing') {
  	  	  	  	Mowing.findOne(service.id, function (err, mowing) {
  	  	  	  	  if (err) callback(err);
  	  	  	  	  callback(null, mowing);
  	  	  	  	})
  	  	  	  }	else if (service.name === 'leaf removal') {
  	  	  	  	LeafRemoval.findOne(service.id, function (err, leafremoval) {
  	  	  	  	  if (err) callback(err);
  	  	  	  	  callback(null, leafremoval);
  	  	  	  	})
  	  	  	  } else if (service.name === 'weed control') {
  	  	  	  	WeedControl.findOne(service.id, function (err, weedcontrol) {
  	  	  	  	  if (err) callback(err);
  	  	  	  	  callback(null, weedcontrol);
  	  	  	  	})
  	  	  	  } else if (service.name === 'yard cleaning') {
  	  	  	  	YardCleaning.findOne(service.id, function (err, yardcleaning) {
  	  	  	  	  if (err) callback(err);
  	  	  	  	  callback(null, yardcleaning);
  	  	  	  	})
  	  	  	  }
  	  	  	},
  	  	  	function (err, results) {
  	  	  	  if (err) callback(err);	
  	  	  	  booking['info'] = results;
  	  	  	  callback(null, booking);
  	  	  	}
  	  	  	)
		  },
		  function (err, results) {
		  	if (err) return res.notFound();
	 	  	res.ok(results);	
  	  	  }
  	  	)
  	})
  } 
}	
