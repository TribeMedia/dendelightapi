/**
 * Mowing.js
 *
 */

module.exports = {

  // Mowing.create()
  create: function (req, res) {
    var params = req.params.all();
    
    Mowing.create(params).exec(function(err, mowing) {
      if ((err) || (!mowing)) {
        return res.badRequest(err);
      } else {
        return res.status(201).json({mowing: mowing})
      }
    });
  },

  // Mowing.find(). Return 1 object from id
  find: function (req, res) {
    var id = req.param('id');
    var idShortCut = isShortcut(id);

    if (idShortCut === true) {
      return next();
    };

    if (id) {
      Mowing.findOne(id, function(err, mowing) {
        if(mowing === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({mowing: mowing});
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
      Mowing.find(options, function(err, mowing) {
        if(mowing === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({mowings: mowing});
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

    Mowing.update(id, criteria, function (err, mowing) {
      if(mowing.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({mowing: mowing});

    });
  },

  // a DESTROY action. Return 204 status
  destroy: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };

    Mowing.destroy(id, function (err, mowing) {
      if (err) return res.forbidden(err);

      return res.status(204).json(mowing);
    });

  },

  // Get info
  get_info: function (req, res) {
    var size = req.param('size');

    Mowing.find({lowerSize: { '<': size}, upperSize: { '>=': size}}, function (err, mowing) {
      if (err) return res.notFound();
      res.ok({mowing: mowing});
    });
  }
};