'use strict';

angular.module('app')

  .controller('wineListController', function (cheeseStore, $scope) {

    (function (vm) {


      cheeseStore.stream.subscribe(function(cheeseList){
        vm.cheeseList = cheeseList;
      });



      $scope.$on('$destroy', function(){

      });
    }, this)
  });