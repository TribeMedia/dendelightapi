/**
 * TransactionController
 *
 */
module.exports = {
  //Booking_info /api/v1/booking_info. TODO: use to view a list  of booking haven't done
  user_booking_info: function (req, res) {
    var userId = req.user.id;

    Booking.find({where: {userId: userId, completed: false, quoteId: null}, sort: 'createAt DESC'}, function (err, bookings) {
      if(bookings.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({bookings: bookings});
    });
  },
    
  // Quote_info /api/v1/quote_info. Todo: use to view a list of quotes submited for a booking
  user_quote_info: function (req, res) {
    var userId = req.user.id;

    Quote.find({where: {userId: userId, active: true}, sort: 'createAt DESC'}, function(err, quotes) {
      if(quotes.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({quotes: quotes});
    })
  },

  // quote_accept /api/v1/quote_accept/:id?. TODO: use for accepting a quote
  user_quote_accept: function(req, res) {
    var quoteId = req.param('id');
    var bookingId = req.param('bookingId');
    var providerId = req.param('providerId');

    Quote.update({bookingId: bookingId}, {active: false}, function(err, quotes) {
      if (err) return res.notFound();

      Quote.update({id: quoteId}, {accepted: true}, function(err, quote) {
        if (err) return res.notFound();

        Booking.update({id: bookingId}, {quoteId: quote.id, providerId: providerId}, function(err, booking) {
          if (err) return res.notFound();

          var mes = 'Your quote has been accepted';

          ProviderNote.create({message: mes}, function(err, providernote) {
            if (err) return res.badRequest(err);

            var kue = require('kue')
            , queue = Kue.create()
            .deploy()
            .priority('high')
            .save()
          })
        })
      })
    })
  },

  //provider_task /api/v1/provider_task. TODO: use to get a list of task need to be done 
  provider_task: function (req, res) {
    var providerId = req.provider.id;

    Booking.find({where: {providerId: providerId, completed: false}, sort: 'bookTime ASC'}, function (err, bookings) {
      if(bookings.length === 0) return res.notFound();

      if (err) return res.badRequest(err);

      res.ok({bookings: bookings});
    });
  },

  // Provider_quote_active. TODO: use to get a list of in queue quotes
  provider_quote_active: function (req, res) {
    var providerId = req.provider.id;

    Quote.find({where: {providerId: providerId, active: true}, sort: 'serviceTime ASC'}, function (err, quotes) {
      if (quotes.length === 0) return res.notFound;

      if (err) return res.badRequest(err);

      res.ok({quotes: quotes});
    })
  }

}