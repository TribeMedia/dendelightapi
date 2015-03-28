require("sails-test-helper");
var request = require('supertest');

describe('AuthController', function() {

	describe('#login()', function() {
		beforeEach(function(done) {
			User.create({email: 'hello@gmail.com', password: '14491992'}, function(req, res) { done(); })
		});
		it('should parse json response and auth token', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/login')
				.send({email: 'hello@gmail.com', password: '14491992'})
				.expect(200)
				.expect(hasUserAndToken)
				.end(done);
		function hasUserAndToken (res) {
			if (!('name') in res.body) return "missing name key";
			if (!('token') in res.body) return "missing token";
		};
		})
	});	
});