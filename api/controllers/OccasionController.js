/**
 * Occasion.js
 *
 * @description :: Server-side logic for managing comments.
 */

module.exports = {

  /**
   * Occasion.create()
   */
  create: function (req, res) {
    var params = req.params.all();
    Occasion.create(params).exec(function(err, occasion) {
      if ((err) || (!occasion)) {
        return res.status(400).json({error: err})
      } else {
        return res.status(201).json(occasion)
      }
    });
  },

  // Occasion.find(). Return 1 object from id
  find: function (req, res, next) {
    var id = req.param('id');

    var idShortCut = isShortcut(id);

    if (idShortCut === true) {
        return next();
    }

    if (id) {

        Occasion.findOne(id, function(err, occasion) {

            if(occasion === undefined) return res.notFound();

            if (err) return next(err);

            res.status(200).json(occasion);

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
         Occasion.find(options, function(err, occasion) {

            if(occasion === undefined) return res.notFound();

            if (err) return next(err);

            res.json(occasion);

        });

        function isShortcut(id) {
        if (id === 'find'   ||  id === 'update' ||  id === 'create' ||  id === 'destroy') {
        return true;
        };
      }
    }   

  },   

  // an UPDATE action . Return object in array
    update: function (req, res, next) {

        var criteria = {};

        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Occasion.update(id, criteria, function (err, occasion) {

            if(occasion.length === 0) return res.notFound();

            if (err) return next(err);

            res.status(200).json(occasion);

        });
    },

  // a DESTROY action. Return 204 status
      destroy: function (req, res, next) {

          var id = req.param('id');

          if (!id) {
              return res.badRequest('No id provided.');
          }

          Occasion.findOne(id).exec(function(err, result) {
              if (err) return res.serverError(err);

              if (!result) return res.notFound();

              Occasion.destroy(id, function (err) {

                  if (err) return next (err);

                  return res.status(204);
              });

          });
      },
};