require("sails-test-helper");
var request = require('supertest');

describe('OccasionController', function() {
		var token;
		before(function(done) {
			Occasion.create({name: "Welldone"}, function(err, welldone) {})	
			User.create({email: "hello1@gmail.com", password: "14491992"}, function(err, user) {
				var jwt = require('jsonwebtoken');
				var secret = '6ab198087a16e6d49b438a7aa514731f';
				token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
				done();
			});
		});

	describe('#find()', function() {
		it('should parse json list of occasion', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/occasion')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
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
				.post('/api/v1/occasion')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({name: 'Party'})
				.expect(201)
				.expect(hasName)
				.end(done);

		});
		it('should throw errors', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/occasion')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({name: ''})
				.expect(400)
				.end(done);
		});
		function hasName(res) {
		  if (!('name' in res.body)) return "missing name key";
	}	

	});
});