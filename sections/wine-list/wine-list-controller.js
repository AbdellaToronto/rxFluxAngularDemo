'use strict';

angular.module('app')

  .controller('wineListController', function (wineStore, $scope) {
    (function (vm) {


      //This is what's called a subscriber. It links up to a particular observable, in this case the one from winestore,
      //and whenever that observable updates, the subscribe function 'fires'
      //We set it on a variable so that we can later dispose of it - that's because the subscription of an observable
      //lives outside of this controller - in fact if you inspect the observable itself in the winestore, you'll see
      //all the subscribers still existing, even if the controller the subscriber is in is destroyed - unless you explicitly
      //dispose of that subscription - which if you look down at the $scope.$on('$destroy'... - you'll see that's what we do
      var unsubWineStream = wineStore.stream
        .subscribe(function (wineList) {
          vm.wineList = wineList;
        });

      $scope.$on('$destroy', function () {
        unsubWineStream.dispose();
      });

    })(this);


  });
