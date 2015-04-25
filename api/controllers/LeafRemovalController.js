/**
 * LeafRemovalController.js
 *
 */

module.exports = {

  // LeafRemoval.find(). Return 1 object from id
  find: function (req, res) {
    var id = req.param('id');
    var idShortCut = isShortcut(id);

    if (idShortCut === true) {
      return next();
    };

    if (id) {
      LeafRemoval.findOne(id, function(err, leafremoval) {
        if(leafremoval === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({leafremoval: leafremoval});
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
      LeafRemoval.find(options, function(err, leafremoval) {
        if(leafremoval === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({leafremovals: leafremoval});
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

    LeafRemoval.findOne(id, function (err, leafremoval) {
      if (err) return res.notFound(err);

      async.series([
        function (callback) {
          Provider.findOne(leafremoval.providerId, function (err, provider) {
            var index = provider.schedule.indexOf({startTime: leafremoval.bookTime, endTime: (leafremoval.bookTime + leafremoval.estimatedDuration)})
            provider.schedule.splice(index, 1);

            async.map(provider.schedule,
              function (slot, callback) {
                if ( (slot.startTime < leafremoval.bookTime) && (slot.endTime > leafremoval.bookTime) ) {
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
                        ProviderNotification.create({providerId: providerId, serviceId: leafremoval.id, serviceName: 'leaf_removal', mes: 'Is dismissed as time clashed'}, function (err, notification) {
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
                                var estimatedDuration = leafremoval.estimatedDuration;
                                id = providers.results[0].obj._id;
                                endTime = leafremoval.bookTime + estimatedDuration;
                                provider.update({_id: id}, {$push: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err) {
                                  leafremoval.providerId = id.toString();
                                  leafremoval.save(function (err) {
                                    if (err) callback(err);
                                  ProviderNotification.create({providerId: id.toString(), serviceId: yardcleanning.id, serviceName: 'yard cleaning', mes: 'Is booked'}, function (err, providernote) {
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

                  provider.schedule.push({startTime: parseInt(criteria.bookTime), endTime: (parseInt(criteria.bookTime) + leafremoval.estimatedDuration)})
                  provider.save(function (err) {
                    if (err) console.log(err);
                    ProviderNotification.create({providerId: provider.id, serviceId: leafremoval.id, serviceName: 'leaf_removal', mes: 'Is rescheduled'}, function (err, providernote) {
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
          leafremoval.bookTime = parseInt(criteria.bookTime);
          leafremoval.save(function (err) {
            if (err) console.log(err);
            callback(null, leafremoval);
          })
        }],
        function (err, results) {
          if (err) return res.badRequest();
          res.ok({leafremoval: results[1]});
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

    LeafRemoval.update(id, criteria, function (err, leafremoval) {
      if(leafremoval.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({leafremoval: leafremoval});

    });
  },

  destroy: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };

    LeafRemoval.findOne(id, function (err, leafremoval) {
      if (err) return res.forbidden(err);
      async.series([
        function (callback) {
          Provider.findOne(leafremoval.providerId, function (err, provider) {
            var index = provider.schedule.indexOf({startTime: leafremoval.bookTime, endTime: (leafremoval.bookTime + leafremoval.estimatedDuration)});
            provider.schedule.splice(index, 1);
            provider.save(function (err) {
              if (err) console.log(err);
              ProviderNotification.create({providerId: provider.id, serviceId: leafremoval.id, serviceName: 'leaf_removal', mes: 'Is canceled'}, function (err, notification) {
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
          Booking.findOne(leafremoval.bookingId, function (err, booking) {
            if (err) console.log(err);

            var index = booking.service.indexOf({name: 'leaf_removal', id: leafremoval.id});
            booking.service.splice(index, 1);
            booking.save(function (err) {
              if (err) console.log(err);

              callback(null);
            })
          })
        },
        function (callback) {
          leafremoval.remove(function (err) {
            if (err) console.log(err);

            callback(null, leafremoval);
          })
        }],
        function (err, results) {
          if (err) return badRequest(err);
          return res.status(204).json(leafremoval);
        }
      )  
    });

  },

};