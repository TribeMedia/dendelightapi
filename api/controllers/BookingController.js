/**
 * Booking.js
 *
 */

module.exports = {

  // Booking.create()
  create: function (req, res) {
    var params = req.params.all();
    var userId = req.user.id;
    params['userId'] = userId;

    var services = [];

    if ((params.address) && (!params.lat)) {
      var geocoder = require('geocoder');
      geocoder.geocode(params.address, function ( err, data ) {
        if (data) {
          params['lat'] = data.results[0].geometry.location.lat;
          params['lng'] = data.results[0].geometry.location.lng;
          params['postcode'] = data.results[0].address_components[5].long_name;
        }
      });
    };

    for (i = 0; i <= params['services'].length; i ++) {
      Provider.native(function(err, provider) {
        provider.geoNear(params['lng'], params['lat'], {limit: 1, maxDistance: 10000, query: {'service': params['service'][i], 'schedule': {$not: {'schedule.startTime': {$gt: params['bookTime']}, 'schedule.endTime': {$lt: params['bookTime']}}}}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
          if (err) return res.notFound(err);

          params['providerId'] = providers[0]._id.to_s;
          params['services'][i].create(params).exec(function(err, service) {
            service
            ProviderNotification.create({providerId: providers[0].id, bookingId: booking.id, params['services'][i]: service.id}, function (err, providernote) {
              if (err) return res.badRequest(err);
              var nsp = sails.io.of('/provider_' + providernote.providerId);
              nsp.on('connection', function(socket) {
                socket.emit('notification', providernote);
              });
            });
          });

        });
      }  
      });  
    
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
  update: function (req, res) {
    var criteria = {};

    criteria = _.merge({}, req.params.all(), req.body);

    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
      };

    Booking.update({id: id, userId: req.user.id}, criteria, function (err, booking) {
      if(booking.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({booking: booking});

    });
  },

  // a DESTROY action. Return 204 status
  destroy: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };

    Booking.destroy({id: id, userId: req.user.id}, function (err, booking) {
      if (err) return res.forbidden(err);

      return res.status(204).json(booking);
    });

  },
};