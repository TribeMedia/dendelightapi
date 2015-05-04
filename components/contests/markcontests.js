'user strict';

angular.module('markcontests', [])
	.factory('MarkContests', function($http) {
		var url = 'http://api.cheersee.dev'
		return {
			markContest: function(id) {
				return $http.post(url + "/marked_contests?cid=" + id);
			},
		};
	});