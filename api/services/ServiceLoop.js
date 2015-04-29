  destroy: function (req, res) {
    var id = req.param('id');
    function serviceDelete(err, service) {
      if (err) return res.notFound(err);

      
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