'use strict';

angular.module('app')

  .controller('homeController', function (cheeseStore, wineStore, wineActions, $scope) {


    (function (vm) {


      //This sets a view function to a specific action related to wine, in this case, updating pairing information
      vm.updateWinePairing = function (wineID, cheeseID) {
        wineActions.addPairingToWine(wineID, cheeseID);
      };


      var unsubWineStream = wineStore.stream
        .subscribe(function (wineList) {
          vm.wineList = wineList;
        });

      var unsubCheeseStream = cheeseStore.stream
        .subscribe(function (cheeseList) {
          vm.cheeseList = cheeseList;
        });


//here I will show something a bit more
      //complicated, where I combine two separate observable streams to create a new array, I'll put this array right
      //below the wine list in the view (home.html)
      //Try putting breakpoints throughout this file to see how rxjs behaves
      var unsubWineAndCheeseStream = wineStore.stream
        .flatMap(function (wineList) {
          return Rx.Observable
            .fromArray(wineList) //turns the array into a stream of individual items
            .flatMap(function (singleWine) {

              //in a flatmap, if you return another observable, the proccess waits until this new observable fires
              return cheeseStore.stream
                .map(function (cheeseList) {
                  //Filters out the cheeses to see if the pairings match the wines ID
                  return R.filter(function (singleCheese) {
                    return singleWine.pairings.includes(singleCheese.id);
                  }, cheeseList);
                })

                //creates a new wine object
                .map(function (filteredCheeseList) {
                  return {
                    wineName: singleWine.name,
                    cheeseList: filteredCheeseList
                  }
                });
            })
            //the most confusing part, not something we use a lot in the application, so you can ignore it
            //it's just turning the stream into an array
            .windowWithCount(wineList.length)
            .selectMany(function (windowObs) {
              return windowObs.toArray();
            })
        })
        //This subscribe block now gets an array that is formatted by the map function above
        .subscribe(function (winesWithCheeseNamePairings) {
          vm.winesAndCheeses = winesWithCheeseNamePairings;
        });


      $scope.$on('$destroy', function () {
        unsubWineAndCheeseStream.dispose();
        unsubWineStream.dispose();
        unsubCheeseStream.dispose();
      });
    })(this);

  });