require("sails-test-helper");
var request = require('supertest');

describe('UserController', function() {

	describe('#find()', function() {
		var token;
		beforeEach(function(done) {
			factory.load();
			factory.create("user", function(user) {
				var jwt = require('jsonwebtoken');
				var secret = '6ab198087a16e6d49b438a7aa514731f';
				token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
				done();
			});
		});
		it('should parse json list of users', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/user')
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
				.post('/api/v1/user')
				.send({email: 'vuongngo.pd@gmail.com', password: '14491992'})
				.expect(201)
				.expect(hasUserKey)
				.end(done);

		});
		it('should throw errors', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/user')
				.send({email: '', password: '14491992'})
				.expect(400)
				.end(done);
		});
		function hasUserKey(res) {
		  if (!('user' in res.body)) return "user key";
		}	

	});
});