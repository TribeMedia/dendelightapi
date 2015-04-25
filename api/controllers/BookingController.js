/**
 * Booking.js
 *
 */

module.exports = {

  // Booking.create()
  create: function (req, res) {
    var userId = req.user.id;
    var services = [];
    var params = req.params.all();

    async.waterfall([
      function (callback) {

        if ((params.address) && (!params.lat)) {
          var geocoder = require('geocoder');
          geocoder.geocode(params.address, function ( err, data ) {
            if (data) {
              params['location'] = {'type': 'Point', 'coordinates': [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat]};
              lat = data.results[0].geometry.location.lat;
              lng = data.results[0].geometry.location.lng;
              params['postcode'] = data.results[0].address_components[5].long_name;
              callback(null, lat, lng);
            }
          });
        };
      },
      function (lat, lng, callback) { 
        if( typeof params.services === 'string' ) {
            params['services'] = [ params.services ];
        };
        async.map(params.services, function (service, callback) {
          var serviceName = service;
          var bookTime = parseInt(params.bookTime);
          var estimatedDuration = parseInt(params.estimatedDuration);
          var endTime = bookTime + estimatedDuration;
          var createdService;
          console.log(service);      
          async.waterfall([
            function (callback) {
              console.log(serviceName);
              Provider.native(function(err, provider) {
                async.waterfall([
                  function (callback) {
                    provider.geoNear(lng, lat, { maxDistance: 10000, query: {'service': serviceName, 'schedule.startTime': {$lt: bookTime}, 'schedule.endTime': {$gt: bookTime}}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
                      if (mongoErr) callback(mongoErr);

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
                    provider.geoNear(lng, lat, { limit: 1, maxDistance: 10000, query: {'_id': {$nin: ids},'service': serviceName}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
                      console.log(providers);
                      if (mongoErr) callback(mongoErr);

                      if (providers.results.length === 0) callback('notFound');

                      if (providers.results[0]) { 
                        id = providers.results[0].obj._id;
                        provider.update({_id: id}, {$push: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err) {

                        callback(null, id);

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
            },
            function (id, callback) {
              console.log(endTime);

              if (id) { params['providerId'] = id.toString();};
              if (params['services']) { delete params['services'] };

              function createService(service) {
                services = services.concat({name: serviceName, id: service.id});
                
                ProviderNotification.create({providerId: params['providerId'], serviceId: service.id, serviceName: serviceName}, function (err, providernote) {
                  if (err) console.log(err);
                  var nsp = sails.io.of('/provider_' + providernote.providerId);
                  nsp.on('connection', function(socket) {
                    socket.emit('notification', providernote);
                  });
                });
                callback(null, service);

              };

              if (serviceName === 'mowing') {
                Mowing.create(params, function(err, service) {
                  if (err) {callback(err);
                  } else {
                    createService(service);
                  }  
                });
              } else if (serviceName === 'leaf_removal') {
                LeafRemoval.create(params, function(err, service) {
                  if (err) {callback(err);
                  } else {
                    createService(service);
                  }  
                });
              } else if (serviceName === 'weed_control') {
                WeedControl.create(params, function(err, service) {
                  if (err) {callback(err);
                  } else {
                    createService(service);
                  }  
                });
              } else if (serviceName === 'yard_cleaning') {
                YardCleaning.create(params, function(err, service) {
                  if (err) {callback(err);
                  } else {
                    createService(service);
                  }  
                });
              }
            }
          ], 
          function (err, result) {    
            if (err) { callback(err); 
            } else {
              callback(null, result);
            }
          })
        }, 
        function(err, results) {
          if (err) return res.notFound();
          Booking.create({userId: userId, services: services}, function (err, booking) {
            if (err) return res.badRequest(err);
            return res.ok({booking: booking, services: results});
          })
        });  
      }]
    )    
  },

  // Booking.find(). Return 1 object from id
  find: function (req, res) {
    var id = req.param('id');
    var idShortCut = isShortcut(id);

    if (idShortCut === true) {
      return next();
    };

    if (id) {
      Booking.findOne(id, function(err, booking) {
        if(booking === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({booking: booking});
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
      Booking.find(options, function(err, booking) {
        if(booking === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({bookings: booking});
      });

      function isShortcut(id) {
        if (id === 'find'   ||  id === 'update' ||  id === 'create' ||  id === 'destroy') {
        return true;
        };
      }
    }   

  },   

  // an UPDATE action . Return object in array
  // update: function (req, res) {
  //   var criteria = {};

  //   criteria = _.merge({}, req.params.all(), req.body);

  //   var id = req.param('id');

  //   if (!id) {
  //     return res.badRequest('No id provided.');
  //     };

  //   Booking.update({id: id, userId: req.user.id}, criteria, function (err, booking) {
  //     if(booking.length === 0) return res.notFound();

  //     if (err) return res.badRequest(err);

  //     res.ok({booking: booking});

  //   });
  // },

  // a DESTROY action. Return 204 status
  destroy: function (req, res) {
    var id = req.param('id');
    function serviceDelete(err, service) {
      if (err) return res.notFound(err);

      console.log(service);

      async.series([
        function (callback) {
          Provider.findOne(service.providerId, function (err, provider) {
            if (err) { console.log(err); callback(err); };

            console.log(provider);

            var index = provider.schedule.indexOf({startTime: service.bookTime, endTime: (service.bookTime + service.estimatedDuration)});
            provider.schedule.splice(index, 1);
            provider.save(function (err) {

              if (err) { console.log(err); callback(err) };
              
              ProviderNotification.create({providerId: provider.id, serviceId: service.id, serviceName: service.name, mes: 'Is canceled'}, function (err, providernote) {
                if (err) { console.log(err); callback(err) };

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
          service.destroy(function (err) {
            if (err) { console.log(err); callback(err) };

            callback(null);
          })
        }],
      function (err, results) {
        if (err) { console.log(err); return err };
        return true;
      })  
    };

    if (!id) {
      return res.badRequest('No id provided.');
    };

    Booking.findOne({id: id, userId: req.user.id}, function (err, booking) {
      if (err) return res.forbidden(err);

      async.series([
        function (callback) {
          async.map(booking.services, function (service, callback) {

            if (service.name === 'mowing') {
              Mowing.findOne(service.id, function(err, service) {
                if (serviceDelete(err, service) === true) { callback(null) } else { callback(err); };
              });
            } else if (service.name === 'leaf_removal') {
              LeafRemoval.findOne(service.id, function(err, service) {
                if (serviceDelete(err, service) === true) { callback(null) } else { callback(err); };
              });
            } else if (service.name === 'weed_control') {
              WeedControl.findOne(service.id, function(err, service) {
                if (serviceDelete(err, service) === true) { callback(null) } else { callback(err); };
              });
            } else if (service.name === 'yard_cleaning') {
              YardCleaning.findOne(service.id, function(err, service) {
                if (serviceDelete(err, service) === true) { callback(null) } else { callback(err); };
              });
            }

          }, function (err, results) {
            if (err) { console.log(err); callback(err) };
            callback(null);
          });
        },
        function (callback) {
          booking.destroy(function (err) {
            if (err) { console.log(err); callback(err) };
            callback(null);
          })
        }],
        function (err, results) {
          if (err) return res.status(500);
          return res.status(204).json(results);
        }  
      )  
    });

  },
};