/**
 * WeedControlController.js
 *
 */

module.exports = {

  // WeedControl.create()
  create: function (req, res) {
    var params = req.params.all();
    
    WeedControl.create(params).exec(function(err, weedcontrol) {
      if ((err) || (!weedcontrol)) {
        return res.badRequest(err);
      } else {
        return res.status(201).json({weedcontrol: weedcontrol})
      }
    });
  },

  // WeedControl.find(). Return 1 object from id
  find: function (req, res) {
    var id = req.param('id');
    var idShortCut = isShortcut(id);

    if (idShortCut === true) {
      return next();
    };

    if (id) {
      WeedControl.findOne(id, function(err, weedcontrol) {
        if(weedcontrol === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({weedcontrol: weedcontrol});
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
      WeedControl.find(options, function(err, weedcontrol) {
        if(weedcontrol === undefined) return res.notFound();

        if (err) return res.badRequest(err);

        res.ok({weedcontrols: weedcontrol});
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

    WeedControl.update(id, criteria, function (err, weedcontrol) {
      if(weedcontrol.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({weedcontrol: weedcontrol});

    });
  },

  // a DESTROY action. Return 204 status
  destroy: function (req, res) {
    var id = req.param('id');

    if (!id) {
      return res.badRequest('No id provided.');
    };

    WeedControl.destroy(id, function (err, weedcontrol) {
      if (err) return res.forbidden(err);

      return res.status(204).json(weedcontrol);
    });

  },

  // Get info
  get_info: function (req, res) {
    var size = req.param('size');

    WeedControl.find({lowerSize: { '<': size}, upperSize: { '>=': size}}, function (err, weedcontrol) {
      if (err) return res.notFound();
      res.ok({weedcontrol: weedcontrol});
    });
  }

};