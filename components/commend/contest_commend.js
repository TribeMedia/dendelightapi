'use strict';

angular.module('contest_commend', [])
	.factory('ContestComments', function($http) {
		var url = "http://api.cheersee.dev"
		return {
			create: function(cid, formData) {
				return $http.post(url + "/clink_comments/" + cid + "/c_comments", formData)
			},
			get: function(cid, page) {
				return $http.get(url + "/clink_comments/" + cid + "/c_comments?page=" + page)
			}

		};
	})
	.directive('contestCommend', function() {
		return {
			scope: {
				cid: '=commendlink'
			},
			templateUrl: '/app/shared/partials/commend.html',
			controller: function($scope, ContestComments, socket) {
				$scope.getcomments = function (page) {
					ContestComments.get($scope.cid, page).success(function(result) {
						$scope.comments = $scope.comments.concat(result.comments);
						$scope.total_page = result.meta.pagination.total_pages;
					}).error(function(err) {
						console.log(err);
					});					
				};
				$scope.page = 1;
				$scope.comments = [];
				$scope.getcomments($scope.page);
				$scope.morecomments = function () {
					if ($scope.page < $scope.total_page) {				
						$scope.page ++ ;
						$scope.getcomments($scope.page);};
				};

				$scope.c_comment = {};
				$scope.submit = function() {
					$scope.c_comment.post = $scope.comment;
					var d = new Date();
					$scope.c_comment.created_at = Date.parse(d);
					ContestComments.create($scope.cid, $scope.c_comment).success(function(result) {
						console.log(result);
						$scope.comment = null;
					}).error(function(err){
						console.log(err);
					});					
				};
				socket.on('contest-comment/' + $scope.cid, function (ev, data) {
					console.log(ev);
					$scope.comments = $scope.comments.concat(ev);
				});
			}
		};
	})