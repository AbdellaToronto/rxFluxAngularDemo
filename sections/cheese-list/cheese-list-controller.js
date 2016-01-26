'use strict';

angular.module('app')

  .controller('cheeseListController', function (cheeseStore, cheeseActions, $scope) {

    (function (vm) {

      vm.addCheese = cheeseActions.addCheese;

      var unsubCheeseStore = cheeseStore.stream.subscribe(function(cheeseList){
        vm.cheeseList = cheeseList;
      });


      $scope.$on('$destroy', function(){
        unsubCheeseStore.dispose();
      });
    })(this);
  });