require("sails-test-helper");
var request = require('supertest');

describe('AuthController', function() {

	describe('#user_login()', function() {
		beforeEach(function(done) {
			User.create({email: 'hello@gmail.com', password: '14491992'}, function(req, res) { done(); })
		});
		it('should parse json response and auth token', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/user_login')
				.send({email: 'hello@gmail.com', password: '14491992'})
				.expect(200)
				.expect(hasUserAndToken)
				.end(done);
		function hasUserAndToken (res) {
			if (!('user') in res.body) return "missing user key";
			if (!('token') in res.body) return "missing token";
		};
		})
	});	

	describe('#provider_login()', function() {
		beforeEach(function(done) {
			Provider.create({email: 'hi@gmail.com', password: '14491992', firstName: 'Ghi', lastName: 'Hiy'}, function(req, res) { done(); })
		});
		it('should parse json response and auth token', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/provider_login')
				.send({email: 'hi@gmail.com', password: '14491992'})
				.expect(200)
				.expect(hasProviderAndToken)
				.end(done);
		function hasProviderAndToken (res) {
			if (!('provider') in res.body) return "missing provider key";
			if (!('token') in res.body) return "missing token";
		};
		})
	});

	describe('#admin_login()', function() {
		it('should parse json response and auth token', function(done) {
			request(sails.hooks.http.app)
				.post('/api/administrator')
				.send({email: 'vuongngo.pd@gmail.com', password: 'admin12345'})
				.expect(200)
				.expect(hasAdminAndToken)
				.end(done);
		function hasAdminAndToken (res) {
			if (!('admin') in res.body) return "missing admin key";
			if (!('token') in res.body) return "missing token";
		};
		})
	});

});