require("sails-test-helper");
var request = require('supertest');

describe('OccasionSizeController', function() {
		var token;
		before(function(done) {
			OccasionSize.create({size: "1 to 5"}, function(err, welldone) {})	
			User.create({email: "hello2@gmail.com", password: "14491992"}, function(err, user) {
				var jwt = require('jsonwebtoken');
				var secret = '6ab198087a16e6d49b438a7aa514731f';
				token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
				done();
			});
		});

	describe('#find()', function() {
		it('should parse json list of occasion', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/occasion_size')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.expect(countIsTrue)
				.end(done);
		function countIsTrue (res) {
			if (res.body.length = 0) return "count is wrong";
		};
		})
	});

	describe('#create()', function() {
		it('should have  json response', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/occasion_size')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({size: '5 to 10'})
				.expect(201)
				.expect(hasSize)
				.end(done);

		});
		it('should throw errors', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/occasion_size')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({size: ''})
				.expect(400)
				.end(done);
		});
		function hasSize(res) {
		  if (!('size' in res.body)) return "missing size key";
	}	

	});
});