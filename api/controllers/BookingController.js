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
    if( typeof params.services === 'string' ) {
        params['services'] = [ params.services ];
    };
    var lat;
    var lng;
    var createdService;
    var serviceName;                  
    var bookTime = parseInt(params.bookTime);
    var estimatedDuration = parseInt(params.estimatedDuration);
    var endTime = bookTime + estimatedDuration;
    var id;

    // Convert address to lat, lng & point
    Locations.getLocation(params.address)
      .then(function(result) {
        lng = result.lng;
        lat = result.lat;
        params['location'] = result.loc;
        params['postcode'] = result.postcode;
        // Search array of providers who can't provide service
        return Queries.searchBusyProvider(lng, lat, params.services, bookTime);
      })
      .then(function(ids) {
        // Search nearest provider who can provide  service
        return Queries.searchFreeProvider(lng, lat, params.services, bookTime, ids);
      })
      .then(function(providers) {
        console.log(providers);
        if (providers.results[0]) { 
          id = providers.results[0].obj._id;
        };        
        // Map array of service and search provider for each
        return params.services.reduce(function(sequence, service) {          
          return sequence.then(function() {            
            serviceName = service;
            // Delete services params to create individual service like mowing...
            if (params['services']) { delete params['services'] };
            params['providerId'] = id.toString();

            // Loop through service and create associated service
            if (serviceName === 'mowing') {
              return Mowing.create(params)
            } else if (serviceName === 'leaf_removal') {
              LeafRemoval.create(params)
            } else if (serviceName === 'weed_control') {
              WeedControl.create(params)
            } else if (serviceName === 'yard_cleaning') {
              YardCleaning.create(params)
            };

          })
          .then(function(service) {
            console.log(service);
            // Create a hash of services to store in Booking
            services = services.concat({name: serviceName, id: service.id});
            
            // Create provider notification and push notfication on socket
            ProviderNotification.create({providerId: params['providerId'], serviceId: service.id, serviceName: serviceName}, function (err, providernote) {
              if (err) console.log(err);
              var nsp = sails.io.of('/provider_' + providernote.providerId);
              nsp.on('connection', function(socket) {
                socket.emit('notification', providernote);
              });
            });
          });

        }, Promise.resolve()); 
      })
      .then(function() {
        // Update provider schedule
        return Queries.updateProviderAddSchedule(id, bookTime, endTime)                   
      })
      .then(function() {
        // Create Booking by hash of services above
        return Booking.create({userId: userId, services: services})
      })
      .then(function(booking) {
        console.log(booking);
        // Update bookingId for each associated services
        return Queries.updateServiceWithBookingID(booking);
      })
      .then(function(service) {
        // Return JSON of booking and array of services
        return res.ok(service);
      })
      .catch(function(err) {
        res.badRequest(err);
      })
  
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
    var startTime;
    var endTime;
    var service;

    if (!id) {
      return res.badRequest('No id provided.');
    };

    Booking.findOne({id: id, userId: req.user.id})
      .then(function(booking) {

        return booking.services.reduce(function(sequence, service) {          
          return sequence.then(function() {            

            // Search service with id (eg. mowing)
            return Queries.searchServiceWithId(service.name, service.id);

          })
          .then(function(service) {
            startTime = service.bookTime;
            endTime = service.bookTime + service.estimatedDuration;
            service = service;
            // Find provider
            return Provider.findOne(service.providerId);
          })
          .then(function(provider) {
            var ObjectID = require('mongodb').ObjectID;
            var providerId = ObjectID(provider.id);
            // Update provider schedule with mongonative, return objectId
            return Queries.updateProviderRemoveSchedule(providerId, startTime, endTime);
          })
          .then(function(pid) {
            // Create notification
            return ProviderNotification.create({providerId: pid.toString(), serviceId: service.id, serviceName: service.name, mes: 'Is canceled'})
          })
          .then(function(ProviderNotification) {
            // Create socket
            var nsp = sails.io.of('/provider_' + ProviderNotification.providerId);
            nsp.on('connection', function(socket) {
              socket.emit('notification', ProviderNotification);
            });
            // Destroy related service
            return service.destroy;            
          })
        }, Promise.resolve()); 
      })
      .then(function() {
        // Destroy booking
        return Booking.destroy({id: id, userId: req.user.id});
      })
      .then(function(booking) {
        return res.status(204).json(booking);
      })    
      .catch(function(err) {
        return res.status(500);
      })    
  },
};