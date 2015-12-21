'use strict';

angular.module('app')
  .factory('wineActions', function (actionDispatcher) {


    function _addPairingToWine(wineID, cheeseID){

      actionDispatcher.dispatchAction('addWinePairing', {
        wineID: wineID,
        cheeseID: cheeseID
      });
    }

    return {
      addPairingToWine: _addPairingToWine
    }
  });