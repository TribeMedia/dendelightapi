'use strict';

angular.module('routes', ['ui.router', 'accesslevels'])
  .config(function($stateProvider, $urlRouterProvider, AccessLevels) {

    $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })
      .state('anon.home', {
        url: '/',
        templateUrl: '/app/views/landingpage/landingpage.html',
        controller: 'SignupCtrl'
      })
      .state('anon.login', {
        url: '/login',
        templateUrl: '/app/views/login/login.html',
        controller: 'LoginCtrl'
      });

    $stateProvider
      .state('user', {
        abstract: true,
        // Bugs, refresh leads to homepage
        templateUrl: '/app/shared/partials/topbar.html',
        controller: 'UserInfoCtrl',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.logout', {
        url: '/logout',
        controller: 'LogoutCtrl',
      })
      .state('user.allcontests', {
        url: '/contests',
        controller: 'AllContestsCtrl',
        templateUrl: '/app/views/contests/allcontests.html',
      })
       .state('user.createcontests', {
        url: '/contest',
        controller: 'CreateContestCtrl',
        templateUrl: '/app/views/contests/create_contest.html',
      })
      .state('user.allparticipations', {
        url: '/participations',
        controller: 'AllParticipationsCtrl',
        templateUrl: '/app/views/participations/allparticipations.html',
      })
      .state('user.marked', {
        url: '/mark',
        controller: 'MarkedCtrl',
        templateUrl: '/app/views/marked_contest/marked.html',
      })
      .state('user.join', {
        url: '/join/:id',
        controller: 'CreateParticipationCtrl',
        templateUrl: '/app/views/participations/create_participation.html',
      })      
      .state('user.allfeeds', {
        url: '/feeds',
        controller: 'AllFeedsCtrl',
        templateUrl: '/app/views/feeds/allfeeds.html',
      })
      .state('user.userfeeds', {
        url: '/user/:id',
        controller: 'UserFeedsCtrl',
        templateUrl: '/app/views/feeds/userfeeds.html',
      })
      .state('user.relatedfeeds', {
        url: '/feed/:id',
        controller: 'RelatedFeedsCtrl',
        templateUrl: '/app/views/feeds/relatedfeeds.html',
      })
      .state('user.ownerfeeds', {
        url: '/:id',
        controller: 'OwnerFeedsCtrl',
        templateUrl: '/app/views/user/user.html',
      });

    $urlRouterProvider.otherwise("/feeds");
  });