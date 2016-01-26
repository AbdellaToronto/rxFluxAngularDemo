'use strict';

angular.module('app')
  .factory('wineStore', function (actionDispatcher) {

    var winesObservable = new Rx.ReplaySubject(1); //A replay subject that keeps the history of 1 item

    var mockWines = Immutable.List([
      _mockImmutableWineGenerator('Kangaroo Red', 0, [2]),
      _mockImmutableWineGenerator('Monkey White', 1, [1, 3]),
      _mockImmutableWineGenerator('Turtle Rose', 2, [0, 2, 3]),
      _mockImmutableWineGenerator('Badger Blend', 3, [0, 1, 2])
    ]);

    //On next is a way to fire an event and pass data with rx (sometimes just called next) all subscribers
    //to this observable will be notified and the data will be passed to them
    winesObservable.onNext(mockWines);




    //checking for the update pairing action, and updating the mock data accordingly
    actionDispatcher.streams
      .filter(function(action){
      return action.name === 'addWinePairing';
    }).subscribe(function(action){

      //this now triggers a new wineList update, and all listeners will react accordingly
      winesObservable.onNext(

        //this updates the mock data and returns the new list - immutable.js seems unecessary verbose, but it can be
        //very concise, I am being verbose to keep it clean
        mockWines.update(action.data.wineID, function(wineMap){
          var newPairings = wineMap.get('pairings');
          newPairings.push(action.data.cheeseID);
          return wineMap.set('pairings', newPairings);
      })

      );
    });

    return {
      stream: winesObservable.shareReplay(1)
    }

  });


function _mockImmutableWineGenerator(name, id, pairings){
  return Immutable.Map({id: id, name: name, pairings: pairings})

}
