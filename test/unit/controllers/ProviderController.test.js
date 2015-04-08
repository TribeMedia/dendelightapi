require("sails-test-helper");
var request = require('supertest');

describe('ProviderController', function() {

	describe('#find()', function() {
		var token;
		beforeEach(function(done) {
			factory.load();
			factory.create("provider", function(provider) {
				var jwt = require('jsonwebtoken');
				var secret = '6ab198087a16e6d49b438a7aa514731f';
				token = jwt.sign(provider, secret, { expiresInMinutes: 60*24 });
				done();
			});
		});
		it('should parse json list of providers', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/provider')
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
				.post('/api/v1/provider')
				.send({email: 'vuongngo.pd@gmail.com', password: '14491992', firstName: 'Tom', lastName: 'Zoe'})
				.expect(201)
				.expect(hasproviderKey)
				.end(done);

		});
		it('should throw errors', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/provider')
				.send({email: '', password: '14491992'})
				.expect(400)
				.end(done);
		});
		function hasproviderKey(res) {
		  if (!('provider' in res.body)) return "provider key";
		}	

	});
});