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
				.get('/user')
				.set('Content-Type',  'application/json')
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.expect(countIsOne)
				.end(done);
		function countIsOne (res) {
			if (res.body.length != 2) return "count is" + res.body.length;
		};
		})
	});

	describe('#create()', function() {
		it('should have  json response', function(done) {
			request(sails.hooks.http.app)
				.post('/user')
				.send({email: 'vuongngo.pd@gmail.com', password: '14491992'})
				.expect(201)
				.expect(hasEmailAndPasswordKeys)
				.end(done);

		});
		it('should throw errors', function(done) {
			request(sails.hooks.http.app)
				.post('/user')
				.send({email: '', password: '14491992'})
				.expect(400)
				.end(done);
		});
		function hasEmailAndPasswordKeys(res) {
		  if (!('email' in res.body)) return "missing email key";
		  if (!('password' in res.body)) throw new Error("missing password key");
	}	

	});
});