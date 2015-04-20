/**
 * LeafRemovalController.js
 *
 */

module.exports = {

  // LeafRemovalController.create()
  create: function (req, res) {
    var params = req.params.all();
    
    LeafRemovalController.create(params).exec(function(err, leafremoval) {
      if ((err) || (!leafremoval)) {
        return res.badRequest(err);
      } else {
        return res.status(201).json({leafremoval: leafremoval})
      }
    });
  },

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

  // an UPDATE action . Return object in array
  update: function (req, res) {
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

  // a DESTROY action. Return 204 status
  destroy: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };

    LeafRemoval.destroy(id, function (err, leafremoval) {
      if (err) return res.forbidden(err);

      return res.status(204).json(leafremoval);
    });

  },

  // Get info
  get_info: function (req, res) {
    var size = req.param('size');

    LeafRemoval.find({lowerSize: { '<': size}, upperSize: { '>=': size}}, function (err, leafremoval) {
      if (err) return res.notFound();
      res.ok({leafremoval: leafremoval});
    });
  }

};