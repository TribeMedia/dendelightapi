'user strict',

angular.module('accesslevels', [])
	.constant('AccessLevels', {
		anon: 0,
		user: 1
	});