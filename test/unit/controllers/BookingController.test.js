require("sails-test-helper");
var request = require('supertest');

describe('BookingController', function() {
	var adminToken;
	var userToken;
	var userId;
	var providerId;
	var bookingId;
	var jwt = require('jsonwebtoken');
	var secret = '6ab198087a16e6d49b438a7aa514731f';
	before(function(done) {
		User.create({email: "user_test_booking@gmail.com", password: "14491992"}, function(err, user) {
			userId = user.id;
			userToken = jwt.sign(user, secret, { expiresInMinutes: 60*24 });

			Booking.create({userId: userId, service: "Lawning"}, function(err, booking) {
				bookingId = booking.id;
			});	

		});
		Provider.create({email: "provider_test_booking@gmail.com", password: "14491992", firstName: "Tombook", lastName: "Joebook"}, function(err, provider) {
			providerId = provider.id;
		});
		Admin.create({email: "admin_test_booking@gmail.com", password: "14491992"}, function(err, admin) {
			adminToken = jwt.sign(admin, secret, { expiresInMinutes: 60*24 });
			done();			
		})
	});

	describe('#find()', function() {
		it('should parse json list of service', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/booking/')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.expect(200)
				.expect(hasBookingsKey)
				.end(done);
		function hasBookingsKey (res) {
			if (!('bookings' in res.body)) return "missing bookings key";
		};
		});

		it('should parse json of booking', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/booking/' + bookingId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.expect(200)
				.expect(hasBookingKey)
				.end(done);			
		});

		it('should return notFound', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/booking/1' + bookingId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.expect(404)
				.end(done);						
		})

	});

	describe('#create()', function() {
		it('should have  json response', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/booking')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + userToken)
				.send({userId: userId, service: "Lawning"})
				.expect(201)
				.expect(hasBookingKey)
				.end(done);
		});

		it('should return badRequest', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/booking')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + userToken)
				.send({userId: userId, service: ''})
				.expect(400)
				.end(done);
		})

	});

	describe('#update()', function() {
		it('should update booking and have json response', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/booking/' + bookingId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + userToken)
				.send({service: 'Cleaning'})
				.expect(200)
				.expect(hasBookingKey)
				.end(done);
		});

		it('should return badRequest', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/booking/')
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + userToken)
				.send({service: ''})
				.expect(400)
				.end(done);
		});

		it('should return notFound', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/booking/1' + bookingId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + userToken)
				.send({service: 'Cleaning'})
				.expect(404)
				.end(done);
		})

	});

	describe('#destroy()', function() {
		it('should return 204', function(done) {
			request(sails.hooks.http.app)
				.delete('/api/v1/booking/' + bookingId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + userToken)
				.expect(204)
				.end(done);
		})
	})	


	function hasBookingKey (res) {
		if (!('booking' in res.body)) return "missing booking key";
	};

});