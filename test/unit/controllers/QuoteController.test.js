require("sails-test-helper");
var request = require('supertest');

describe('QuotingController', function() {
	var adminToken;
	var providerToken;
	var userId;
	var providerId;
	var bookingId;
	var quoteId;
	var jwt = require('jsonwebtoken');
	var secret = '6ab198087a16e6d49b438a7aa514731f';
	before(function(done) {
		User.create({email: "user_test_quote@gmail.com", password: "14491992"}, function(err, user) {
			userId = user.id;

			Booking.create({userId: userId, service: "Lawning"}, function(err, booking) {
				bookingId = booking.id;
			});	

		});
		Provider.create({email: "provider_test_quote@gmail.com", password: "14491992", firstName: "Tombook", lastName: "Joebook"}, function(err, provider) {
			providerId = provider.id;
			providerToken = jwt.sign(provider, secret, { expiresInMinutes: 60*24 });

			Quote.create({service: 'Lawning', price: '20', bookingId: 'bookingId', providerId: 'providerId'}, function(err, quote) {
				quoteId = quote.id;
			});

		});
		Admin.create({email: "admin_test_quote@gmail.com", password: "14491992"}, function(err, admin) {
			adminToken = jwt.sign(admin, secret, { expiresInMinutes: 60*24 });
			done();			
		})
	});

	describe('#find()', function() {
		it('should parse json list of quotes', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/quote/')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.expect(200)
				.expect(hasQuotesKey)
				.end(done);
		function hasQuotesKey (res) {
			if (!('quotes' in res.body)) return "missing quotes key";
		};
		});

		it('should parse json of quote', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/quote/' + quoteId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.expect(200)
				.expect(hasQuoteKey)
				.end(done);			
		});

		it('should return notFound', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/quote/1' + quoteId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.expect(404)
				.end(done);						
		})

	});

	describe('#create()', function() {
		it('should have  json response', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/quote')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + providerToken)
				.send({bookingId: bookingId, service: 'Lawning', price: '40', providerId: providerId})
				.expect(201)
				.expect(hasQuoteKey)
				.end(done);
		});

		it('should return badRequest', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/quote')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + providerToken)
				.send({service: ''})
				.expect(400)
				.end(done);
		})

	});

	describe('#update()', function() {
		it('should update quote and have json response', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/quote/' + quoteId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + providerToken)
				.send({service: 'Cleaning'})
				.expect(200)
				.expect(hasQuoteKey)
				.end(done);
		});

		it('should return badRequest', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/quote/')
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + providerToken)
				.send({service: ''})
				.expect(400)
				.end(done);
		});

		it('should return notFound', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/quote/1' + quoteId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + providerToken)
				.send({service: 'Cleaning'})
				.expect(404)
				.end(done);
		})

	});

	describe('#destroy()', function() {
		it('should return 204', function(done) {
			request(sails.hooks.http.app)
				.delete('/api/v1/quote/' + quoteId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + providerToken)
				.expect(204)
				.end(done);
		})
	});	


	function hasQuoteKey (res) {
		if (!('quote' in res.body)) return "missing quote key";
	};

});