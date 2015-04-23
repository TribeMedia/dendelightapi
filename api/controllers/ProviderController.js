/**
 * Provider.js
 *
 */

module.exports = {

  test: function (req, res) {
    var params = req.params.all();
    var lng = parseFloat(params.lng);
    var lat = parseFloat(params.lat);
    var serviceName = params.service;
    var bookTime = parseInt(params.bookTime);
    var duration = parseInt(params.duration) * 3600000;
    console.log(duration);
  
    Provider.native(function(err, provider) {
      provider.geoNear(lng, lat, {limit: 1, maxDistance: 10000, query: {'service': serviceName, $or: [{'schedule.startTime': {$not: {$gt: bookTime}}}, {'schedule.endTime': {$not: {$lt: bookTime}}}]}, distanceMultiplier: 6371, spherical: true, uniqueDocs: true}, function (mongoErr, providers) {
        if (mongoErr) return res.notFound(mongoErr);
        if (providers.results[0]) { 
          var id = providers.results[0].obj._id;
          var endTime = bookTime + duration;
          provider.update({_id: id}, {$push: {schedule: {startTime: bookTime, endTime: endTime }}}, function (err) {
          });
        }
        return res.ok(providers);
      });
    })  
  },

  // Provider.create()
  create: function (req, res) {
    var params = req.params.all();

    async.waterfall([
      function (callback) {
        if ((params.address) && (!params.lat)) {
          var geocoder = require('geocoder');
          geocoder.geocode(params.address, function ( err, data ) {
            if (data) {
              params['location'] = {type: 'Point', coordinates: [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat]};
              params['postcode'] = data.results[0].address_components[5].long_name;

              callback(null, params);
            }
          });
        };
      },  
      function (callback) {
        Provider.create(params).exec(function(err, provider) {
          if ((err) || (!provider)) {
            return res.badRequest(err);
          } else {
            return res.status(201).json({provider: provider})
          }
        });
      }
    ])
  },

  // Provider.find(). Return 1 object from id
  find: function (req, res) {
    var id = req.param('id');
    var idShortCut = isShortcut(id);

    if (idShortCut === true) {
      return next();
    };

    if (id) {
      Provider.findOne(id, function(err, provider) {
        if(provider === undefined) return res.notFound();

        if (err) return next(err);

        res.ok({provider: provider});

      });
    } else {
      var where = req.param('where');

      if (_.isString(where)) {
        where = JSON.parse(where);
      };
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
      Provider.find(options, function(err, provider) {
        if(provider === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({providers: provider});
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

    Provider.update(id, criteria, function (err, provider) {
      if(provider.length === 0) return res.notFound();

      if (err) return badRequest(err);

      res.ok({provider: provider});
    });
  },

  // a DESTROY action. Return 204 status
  destroy: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };
    Provider.destroy(id).exec(function (err, provider) {
      if (err) return res.serverError(err);

      return res.status(204).json(provider);
    });
  },
};
