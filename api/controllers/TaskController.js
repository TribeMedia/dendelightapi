/**
 * TaskController.js
 *
 */

module.exports = {

  // View task Provider
  provider_task: function (req, res) {
    var params = req.params.all();
    params['providerId'] = req.provider.id;

    Provider.findOne(id, function (err, provider) {
      if (err) return res.notFound();
      
      async.parallel([
        function (callback) {
      	  if (provider.service.indexOf('mowing')) {
      	  	Mowing.find(params, function (err, mowings) {
  	  		  if (err) {
  	  		  	callback(null);
  	  		  } else {
  	  		  	callback(null, mowings);
  	  		  }
      	  	})
      	  } else {
      	  	callback(null);
      	  }
        },
        function (callback) {
      	  if (provider.service.indexOf('leaf removal')) {
      	  	LeafRemoval.find(params, function (err, leafremovals) {
  	  		  if (err) {
  	  		  	callback(null);
  	  		  } else {
  	  		  	callback(null, leafremovals);
  	  		  }
      	  	})
      	  } else {
      	  	callback(null);
      	  }
        },
        function (callback) {
      	  if (provider.service.indexOf('weed control')) {
      	  	WeedControl.find(params, function (err, weedcontrols) {
  	  		  if (err) {
  	  		  	callback(null);
  	  		  } else {
  	  		  	callback(null, weedcontrols);
  	  		  }
      	  	})
      	  } else {
      	  	callback(null);
      	  }
        },
        function (callback) {
      	  if (provider.service.indexOf('yard cleaning')) {
      	  	YardCleaning.find(params, function (err, yardcleanings) {
  	  		  if (err) {
  	  		  	callback(null);
  	  		  } else {
  	  		  	callback(null, yardcleanings);
  	  		  }
      	  	})
      	  } else {
      	  	callback(null);
      	  }
        }
        ],
        function (err, results) {
          if (err) return res.notFound();
          results.sort(function(a, b) { return parseFloat(a.bookTime) - parseFloat(b.bookTime)});
          res.ok(results);
        }
      )

    })
  },

  // Reject tasks
  reject_task: function (req, res) {
	var providerId = req.provider.id;
	var taskId = req.param['id'];
	var params = req.params.all();
	var newProviderId;

	function updateTask (err, task) {
	  if (err) return res.notFound();

	  async.series([
        function (callback) {
          Provider.findOne(providerId, function (err, provider) {
            var index = provider.schedule.indexOf({startTime: service.bookTime, endTime: (service.bookTime + service.estimatedDuration)})
            provider.schedule.splice(index, 1);
            provider.save(function (err) {
              if (err) return callback(err);
              callback(null);
            })
          })
        },
        function (callback) {
          Provider.native(function(err, provider) {
          	var oldId = ObjectId(providerId);
            provider.geoNear(lng, lat, {limit: 1, maxDistance: 10000, query: {'_id': {$not: oldId}, 'service': serviceName, $or: [{'schedule.startTime': {$not: {$gt: bookTime}}}, {'schedule.endTime': {$not: {$lt: bookTime}}}]}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
              if (mongoErr) return callback(err);
              
              if (providers.results[0]) { 
                var estimatedDuration = task.estimatedDuration;
                id = providers.results[0].obj._id;
                endTime = task.bookTime + estimatedDuration;
                provider.update({_id: id}, {$push: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err) {
                  task.providerId = id.toString();
                  task.save(function (err) {
                  	if (err) callback(err);
	                ProviderNotification.create({providerId: params['providerId'], serviceId: service.id, serviceName: serviceName}, function (err, providernote) {
	                  if (err) console.log(err);
	                  var nsp = sails.io.of('/provider_' + providernote.providerId);
	                  nsp.on('connection', function(socket) {
	                    socket.emit('notification', providernote);
	                  });

                 	  callback(null, task);

	                });
                  })

                });
              };
            });
          });

        }],
        function (err, results) {
          if (err) return res.badRequest();

          res.ok(results[0]);
        }
      );
      
	  if (params.taskName === 'mowing') {
	  	Mowing.findOne(taskId, function (err, task) {
	  		updateTask(err, task);
	  	})
	  }  else if (params.taskName === 'leaf removal') {
	  	LeafRemoval.findOne(taskId, function (err, task) {
	  		updateTask(err, task);
	  	})
	  }  else if (params.taskName === 'weed control') {
	  	WeedControl.findOne(taskId, function (err, task) {
	  		updateTask(err, task);
	  	})
	  }  else if (params.taskName === 'yard cleaning') {
	  	YardCleaning.findOne(taskId, function (err, task) {
	  		updateTask(err, task);
	  	})
	  }
	};
  },

  // User view booking
  view_booking: function (req, res) {
  	var userId = req.user.id;
  	var params = req.params.all;
  	params['userId'] = userId;

  	Booking.find(params, function (err, bookings) {
  	  if (err) return res.notFound();

  	  async.map(bookings, 
  	  	function (booking, callback) {
  	  	  async.map(booking.services,
  	  	  	function (service, callback) {
  	  	  	  if (service.name === 'mowing') {
  	  	  	  	Mowing.findOne(service.id, function (err, mowing) {
  	  	  	  	  if (err) callback(err);
  	  	  	  	  callback(null, {mowing: mowing});
  	  	  	  	})
  	  	  	  }	else if (service.name === 'leaf removal') {
  	  	  	  	LeafRemoval.findOne(service.id, function (err, leafremoval) {
  	  	  	  	  if (err) callback(err);
  	  	  	  	  callback(null, {leafremoval: leafremoval});
  	  	  	  	})
  	  	  	  } else if (service.name === 'weed control') {
  	  	  	  	WeedControl.findOne(service.id, function (err, weedcontrol) {
  	  	  	  	  if (err) callback(err);
  	  	  	  	  callback(null, {weedcontrol: weedcontrol});
  	  	  	  	})
  	  	  	  } else if (service.name === 'yard cleaning') {
  	  	  	  	YardCleaning.findOne(service.id, function (err, yardcleaning) {
  	  	  	  	  if (err) callback(err);
  	  	  	  	  callback(null, {yardcleaning: yardcleaning});
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
