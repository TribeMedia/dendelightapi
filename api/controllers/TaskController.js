/**
 * TaskController.js
 *
 */

module.exports = {

  // View task Provider
  provider_job: function (req, res) {
    var params = req.params.all();
    params['providerId'] = req.provider.id;

    Provider.findOne(params['providerId'])
      .then(function(provider) {
        // Find booking related to provider
        return Booking.find(params);
      })
      .then(function(bookings) {
        // Find services related to booking
        return Queries.searchServiceInBookings(bookings);
      })
      .then(function(results) {
        // Return 200
        return res.ok(results);
      })
      .catch(function(err) {
        res.notFound(err);
      })
  },

  // Reject tasks
  reject_job: function (req, res) {
  	var providerId = req.provider.id;
  	var bookingId = req.param('id');
  	var params = req.params.all();
    var ObjectID = require('mongodb').ObjectID;
  	var newProviderId;
    var booking;
    var bookTime;
    var estimatedDuration;
    var endTime;
    var location;
    var services = [];

    Booking.findOne({id: bookingId, providerId: providerId})
      .then(function(booking) {
        booking = booking;
        bookTime = booking.bookTime;
        estimatedDuration = booking.estimatedDuration;
        endTime = bookTime + estimatedDuration;
        location = booking.location
        // create an array of services
        booking.services.forEach(function(element, index, array) {
          services = services.concat(element.name);
        });

        console.log({1: booking});
        // Search for a list of provider id whom could not perform job
        return Queries.searchBusyProvider(location.coordinates[0], location.coordinates[1], services, bookTime);        
      })
      .then(function(ids) {
        console.log({2: ids});
        // Search nearest provider who provides  services
        return Queries.searchFreeProvider(location.coordinates[0], location.coordinates[1], services, bookTime, ids);
      })
      .then(function(providers) {
        console.log({3: providers});
        if (providers.results[0]) {
          newProviderId = providers.results[0].obj._id;
        };
        // Update schedule of provider
        return Queries.updateProviderAddSchedule(newProviderId, bookTime, endTime);
      })
      .then(function() {
        // Update providerId to service
        return Queries.updateServiceWithProviderID(newProviderId.toString(), booking);
      })
      .then(function(results) {
        console.log({4: results});
        // Update booking info
        return Booking.update({id: id}, {providerId: newProviderId.toString()});
      })
      .then(function(booking) {
        res.ok(booking);
      })
      .catch(function(err) {
        console.log({5: err});
        res.badRequest(err);
      })
  },

  // User view booking
  view_booking: function (req, res) {
  	var userId = req.user.id;
  	var params = req.params.all();
  	params['userId'] = userId;

  	Booking.find(params)
      .then(function(bookings) {
        // Find services related to booking
        return Queries.searchServiceInBookings(bookings);
      })
      .then(function(results) {
        return res.ok(results);
      })
      .catch(function(err) {
        return res.notFound(err);
      })
  } 
}	
