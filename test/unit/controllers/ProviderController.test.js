require("sails-test-helper");
var request = require('supertest');

describe('ProviderController', function() {

	var token;
	var providerId;

	before(function(done) {
		factory.load();
		factory.create("provider", function(provider) {
			providerId = provider.id;
			var jwt = require('jsonwebtoken');
			var secret = '6ab198087a16e6d49b438a7aa514731f';
			token = jwt.sign(provider, secret, { expiresInMinutes: 60*24 });
			done();
		});
	});

	describe('#find()', function() {

		it('should parse json list of providers', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/provider')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.expect(hasProvidersKey)
				.end(done);
		function hasProvidersKey (res) {
			if (!('providers' in res.body)) return "no provider key";
		};
		});

		it('should parse json of provider', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/provider/' + providerId)
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.expect(hasProviderKey)
				.end(done);
		function hasProviderKey (res) {
			if (!('provider' in res.body)) return "no provider key";
		};
		});

		it('should return notFound', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/provider/1' + providerId)
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(404)
				.end(done);
		})

	});

	describe('#create()', function() {
		it('should have  json response', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/provider')
				.send({email: 'create_provider_test@gmail.com', password: '14491992', firstName: 'Tom', lastName: 'Zoe'})
				.expect(201)
				.expect(hasProviderKey)
				.end(done);

		});
		it('should return badRequest', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/provider')
				.send({email: '', password: '14491992'})
				.expect(400)
				.end(done);
		});

	});

	describe('#update()', function() {
		it('should update provider and have json response', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/provider/' + providerId)
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({firstName: 'Hell Yeal'})
				.expect(200)
				.expect(hasProviderKey)
				.end(done);
		});

		it('should return badRequest', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/provider/')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({firstName: 'Hell Yeal'})
				.expect(400)
				.end(done);			
		});

		it('should return notFound', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/provider/1' + providerId)
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({firstName: 'Hell Yeal'})
				.expect(404)
				.end(done);
		});

	});

	function hasProviderKey(res) {
	  if (!('provider' in res.body)) return "provider key";
	};

	describe('#destroy()', function() {
		it('should return 204', function(done) {
			request(sails.hooks.http.app)
				.delete('/api/v1/provider/' + providerId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(204)
				.end(done);
		});
	})	
});