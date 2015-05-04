'use strict';

angular.module('feeds', [])
	.factory('Feeds', function($http) {
		var url = 'http://api.cheersee.dev'
		return {
			getAllFeeds: function(page) {
				return $http.get(url + '/feeds?page=' + page);
			},
			getUserFeeds: function(stateParams, page) {
				return $http.get(url + '/feeds/' + stateParams + '/?page=' + page);
			},
			getRelatedFeeds: function(stateParams, page) {
				return $http.get(url + '/feed/' + stateParams +'/?page=' + page);
			}
		};
	});