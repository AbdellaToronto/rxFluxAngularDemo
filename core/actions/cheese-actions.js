'use strict';

angular.module('app')
  .factory('cheeseActions', function (actionDispatcher) {


    function _addCheese(cheeseName){
      actionDispatcher.dispatchAction('addCheese', {
        name: cheeseName
      });
    }

    return {
      addCheese: _addCheese
    }
  });