/**
 * YardCleaningController.js
 *
 */

module.exports = {

  // YardCleaning.create()
  create: function (req, res) {
    var params = req.params.all();
    
    YardCleaning.create(params).exec(function(err, yardcleaning) {
      if ((err) || (!yardcleaning)) {
        return res.badRequest(err);
      } else {
        return res.status(201).json({yardcleaning: yardcleaning})
      }
    });
  },

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

  // an UPDATE action . Return object in array
  update: function (req, res) {
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

  // a DESTROY action. Return 204 status
  destroy: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };

    YardCleaning.destroy(id, function (err, yardcleaning) {
      if (err) return res.forbidden(err);

      return res.status(204).json(yardcleaning);
    });

  },

  // Get info
  get_info: function (req, res) {
    var size = req.param('size');

    YardCleaning.find({lowerSize: { '<': size}, upperSize: { '>=': size}}, function (err, yardcleaning) {
      if (err) return res.notFound();
      res.ok({yardcleaning: yardcleaning});
    });
  }

};