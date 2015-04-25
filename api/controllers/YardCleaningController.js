/**
 * YardCleaningController.js
 *
 */

module.exports = {

  // YardCleaning.find(). Return 1 object from id
  find: function (req, res) {
    var id = req.param('id');
    var idShortCut = isShortcut(id);

    if (idShortCut === true) {
      return next();
    };

    if (id) {
      YardCleaning.findOne(id, function(err, yardcleaning) {
        if(yardcleaning === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({yardcleaning: yardcleaning});
      });
    } else {
      var where = req.param('where');

      if (_.isString(where)) {
        where = JSON.parse(where);
      }
      // This allows you to put something like id=2 to work.
        // if (!where) {

        //     // Build monolithic parameter object
     //    params = req.params.all();

     //    params = _.omit(params, function (param, key) {

     //        return key === 'limit' || key === 'skip' || key === 'sort'

     //    });

        //   where = params;

        //   console.log("making it here!");

        // }

      var options = {
                  limit: req.param('limit') || undefined,
                  skip: req.param('skip')  || undefined,
                  sort: req.param('sort') || undefined,
                  where: where || undefined
          };

      console.log("This is the options", options);
      YardCleaning.find(options, function(err, yardcleaning) {
        if(yardcleaning === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({yardcleanings: yardcleaning});
      });

      function isShortcut(id) {
        if (id === 'find'   ||  id === 'update' ||  id === 'create' ||  id === 'destroy') {
        return true;
        };
      }
    }   

  },   

  user_update: function (req, res) {
    var criteria = {};

    criteria = _.merge({}, req.params.all(), req.body);

    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
      };

    YardCleaning.findOne(id, function (err, yardcleaning) {
      if (err) return res.notFound(err);

      async.series([
        function (callback) {
          Provider.findOne(yardcleaning.providerId, function (err, provider) {
            var index = provider.schedule.indexOf({startTime: yardcleaning.bookTime, endTime: (yardcleaning.bookTime + yardcleaning.estimatedDuration)})
            provider.schedule.splice(index, 1);

            async.map(provider.schedule,
              function (slot, callback) {
                if ( (slot.startTime < yardcleaning.bookTime) && (slot.endTime > yardcleaning.bookTime) ) {
                  callback(false);
                } else { 
                  callback(null);
                };
              }, 
              function (err, results) {
                if (err) {
                  var providerId = provider.id;

                  async.series([
                    function (callback) {
                      provider.save(function (err) {
                        if (err) console.log(err);
                        ProviderNotification.create({providerId: providerId, serviceId: yardcleaning.id, serviceName: 'yard_cleaning', mes: 'Is dismissed as time clashed'}, function (err, notification) {
                          if (err) console.log(err);

                          var nsp = sails.io.of('/provider_' + providernote.providerId);
                          nsp.on('connection', function(socket) {
                            socket.emit('notification', providernote);
                          });

                          callback(null);
                        })
                      });
                    },
                    function (callback) {
                      Provider.native(function(err, provider) {
                        var oldId = ObjectId(providerId);
                        async.waterfall([
                          function (callback) {
                            provider.geoNear(lng, lat, { maxDistance: 10000, query: {'service': serviceName, 'schedule.startTime': {$lt: bookTime}, 'schedule.endTime': {$gt: bookTime}}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
                              if (mongoErr) return res.notFound(mongoErr);

                              if (providers.results.length === 0) {
                                callback(null, []);
                              } else {
                                async.map(providers.results,
                                  function (result, callback) {
                                    callback (result.obj._id);
                                  },
                                  function (err, results) {
                                    if (err) { callback(err); };
                                    callback(null, results);
                                  }
                                  );
                              };
                            });
                          },
                          function (ids, callback) {
                            ids = ids.concat(oldId);
                            provider.geoNear(lng, lat, { limit: 1, maxDistance: 10000, query: {'_id': {$nin: ids},'service': serviceName}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
                              console.log(providers);
    
                              if (providers.results[0]) { 
                                var estimatedDuration = yardcleanning.estimatedDuration;
                                id = providers.results[0].obj._id;
                                endTime = yardcleanning.bookTime + estimatedDuration;
                                provider.update({_id: id}, {$push: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err) {
                                  yardcleanning.providerId = id.toString();
                                  yardcleanning.save(function (err) {
                                    if (err) callback(err);
                                  ProviderNotification.create({providerId: id.toString(), serviceId: yardcleanning.id, serviceName: 'yard_cleaning', mes: 'Is booked'}, function (err, providernote) {
                                    if (err) console.log(err);
                                    var nsp = sails.io.of('/provider_' + providernote.providerId);
                                    nsp.on('connection', function(socket) {
                                      socket.emit('notification', providernote);
                                    });

                                    callback(null, providers);

                                  });
                                  })

                                });
                              };

                            })
                          }
                        ],
                        function (err, result) { 
                          if (err) { callback(err); };
                          callback(null, result);
                        })
                      });
                    }]
                  )

                } else {

                  provider.schedule.push({startTime: parseInt(criteria.bookTime), endTime: (parseInt(criteria.bookTime) + yardcleanning.estimatedDuration)})
                  provider.save(function (err) {
                    if (err) console.log(err);
                    ProviderNotification.create({providerId: provider.id, serviceId: yardcleanning.id, serviceName: 'yard_cleaning', mes: 'Is rescheduled'}, function (err, providernote) {
                      if (err) console.log(err);

                      var nsp = sails.io.of('/provider_' + providernote.providerId);
                      nsp.on('connection', function(socket) {
                        socket.emit('notification', providernote);
                      });

                      callback(null);
                    })
                  });

                }
              }
            );

          });
        },
        function (callback) {
          yardcleaning.bookTime = parseInt(criteria.bookTime);
          yardcleaning.save(function (err) {
            if (err) console.log(err);
            callback(null, yardcleaning);
          })
        }],
        function (err, results) {
          if (err) return res.badRequest();
          res.ok({yardcleaning: results[1]});
        }  
      )  
    });
  },
  
  // an UPDATE action . Return object in array
  provider_update: function (req, res) {
    var criteria = {};

    criteria = _.merge({}, req.params.all(), req.body);

    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
      };

    YardCleaning.update(id, criteria, function (err, yardcleaning) {
      if(yardcleaning.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({yardcleaning: yardcleaning});

    });
  },

  destroy: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };

    YardCleaning.findOne(id, function (err, yardcleaning) {
      if (err) return res.forbidden(err);
      async.series([
        function (callback) {
          Provider.findOne(yardcleaning.providerId, function (err, provider) {
            var index = provider.schedule.indexOf({startTime: yardcleaning.bookTime, endTime: (yardcleaning.bookTime + yardcleaning.estimatedDuration)});
            provider.schedule.splice(index, 1);
            provider.save(function (err) {
              if (err) console.log(err);
              ProviderNotification.create({providerId: provider.id, serviceId: yardcleaning.id, serviceName: 'yard_cleaning', mes: 'Is canceled'}, function (err, notification) {
                if (err) console.log(err);

                var nsp = sails.io.of('/provider_' + providernote.providerId);
                nsp.on('connection', function(socket) {
                  socket.emit('notification', providernote);
                });

                callback(null)
              })
            })
          })
        },
        function (callback) {
          Booking.findOne(yardcleaning.bookingId, function (err, booking) {
            if (err) console.log(err);

            var index = booking.service.indexOf({name: 'yard_cleaning', id: yardcleaning.id});
            booking.service.splice(index, 1);
            booking.save(function (err) {
              if (err) console.log(err);

              callback(null);
            })
          })
        },
        function (callback) {
          yardcleaning.remove(function (err) {
            if (err) console.log(err);

            callback(null, yardcleaning);
          })
        }],
        function (err, results) {
          if (err) return badRequest(err);
          return res.status(204).json(yardcleaning);
        }
      )  
    });

  },

};