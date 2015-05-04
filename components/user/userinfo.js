'use strict';

angular.module('userinfo', [])
	.controller('UserInfoCtrl', function($scope, Userinfos, Auth, $state, socket, LocalService) {
			$scope.Date = new Date();
			$scope.notifications = [];
			$scope.count = 0;
			$scope.view = false;
			$scope.clear = function() {
				Userinfos.clearNotification().success(function(result) {
					$scope.count = 0;
					$scope.view = true;
				}).error(function(err) {
					console.log(err);
				});
			};
			Userinfos.getUser().success(function(result) {
				$scope.owner = result;
			}).error(function(err) {
				// $scope.errors.push(err);
			});
			Userinfos.getNotification().success(function(result) {
				$scope.notifications = $scope.notifications.concat(result.user_notifications);
				$scope.count = $scope.notifications.length;
			}).error(function(err) {
				console.log(err);
			});
			socket.on('user-notification/' + LocalService.get('user_id').replace(/['"]+/g, ''), function (ev, data) {
				console.log(ev);
				$scope.notifications = $scope.notifications.concat(ev);
				$scope.count = $scope.notifications.length
			});
		})
	.factory('Userinfos', function($http, LocalService) {
		var url = 'http://api.cheersee.dev';
		var uid = angular.fromJson(LocalService.get('user_id'))
		return {
			getUser: function() {
				return $http.get(url + '/users/' + uid);
			},
			updateUser: function(pid, formData) {
				return $http.put(url + '/profiles/' + pid, formData);
			},
			getNotification: function() {
				return $http.get(url + '/user_notifications');
			},
			clearNotification: function() {
				return $http.get(url + '/clear_notifications');
			}
		};
	});