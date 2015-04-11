require("sails-test-helper");
var request = require('supertest');

describe('UserController', function() {
	var token;
	var userId;

	before(function(done) {
		factory.load();
		factory.create("user", function(user) {
			userId = user.id;
			var jwt = require('jsonwebtoken');
			var secret = '6ab198087a16e6d49b438a7aa514731f';
			token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
			done();
		});
	});

	describe('#find()', function() {
		it('should parse json list of users', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/user')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.expect(hasUsersKey)
				.end(done);
		function hasUsersKey (res) {
			if (!('users' in res.body)) return "no users key";
		};
		});

		it('should parse json of user', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/user/' + userId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.expect(hasUserKey)
				.end(done);
		});

		it('should return notFound', function(done) {
			request(sails.hooks.http.app)
				.get('/api/v1/user/1' + userId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(404)
				.end(done);
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
		it('should return badRequest', function(done) {
			request(sails.hooks.http.app)
				.post('/api/v1/user')
				.send({email: '', password: '14491992'})
				.expect(400)
				.end(done);
		});

	});

	function hasUserKey(res) {
	  if (!('user' in res.body)) return "user key";
	};

	describe('#update()', function() {
		it('should update user and have json response', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/user/' + userId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({email: 'update_user_test@gmail.com'})
				.expect(200)
				.expect(hasUserKey)
				.end(done);
		});

		it('should return badRequest', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/user/')
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({email: ''})
				.expect(400)
				.end(done);
		});

		it('should return notFound', function(done) {
			request(sails.hooks.http.app)
				.put('/api/v1/user/1' + userId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.send({email: 'update_user_test@gmail.com'})
				.expect(404)
				.end(done);
		})
	});

	describe('#destroy()', function() {
		it('should return 204', function(done) {
			request(sails.hooks.http.app)
				.delete('/api/v1/user/' + userId)
				.set('Content-Type', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(204)
				.end(done);
		})
	})	
});