require("sails-test-helper");
var request = require('supertest');

describe('ServiceController', function() {
		var token;
		var adminToken;
		var jwt = require('jsonwebtoken');
		var secret = '6ab198087a16e6d49b438a7aa514731f';
		before(function(done) {
			Service.create({name: "Welldone"}, function(err, welldone) {})	
			User.create({email: "hello3@gmail.com", password: "14491992"}, function(err, user) {
				token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
			});

			Admin.create({email: "admin_test_service@gmail.com", password: "14491992"}, function(err, admin) {
				adminToken = jwt.sign({admin: admin}, secret, { expiresInMinutes: 60*24 });
				done();			
			})
		});

	describe('#find()', function() {
		it('should parse json list of service', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/service')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.expect(200)
				.expect(countIsTrue)
				.end(done);
		function countIsTrue (res) {
			if (res.body.length = 0) return "count is true";
		};
		})
	});

	describe('#create()', function() {
		it('should have  json response', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/service')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.send({name: 'cleaning'})
				.expect(201)
				.expect(hasService)
				.end(done);

		});
		it('should throw errors', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/service')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + adminToken)
				.send({name: ''})
				.expect(400)
				.end(done);
		});
		function hasService(res) {
		  if (!('service' in res.body)) return "missing service key";
	}	

	});
});