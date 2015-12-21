'use strict';

angular.module('app', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'sections/home/home.html',
        controller: 'homeController as homeCtrl'
      })
      .state('wine-list', {
        url: '/wine-list',
        templateUrl: 'sections/wine-list/wine-list.html',
        controller: 'wineListController as wineListCtrl'
      })
      .state('cheese-list', {
        url: '/cheese-list',
        templateUrl: 'sections/cheese-list/cheese-list.html',
        controller: 'cheeseListController as cheeseListCtrl'
      })
  });