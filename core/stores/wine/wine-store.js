'use strict';

angular.module('app')
  .factory('wineStore', function (actionDispatcher) {

    var winesObservable = new Rx.ReplaySubject(1); //A replay subject that keeps the history of 1 item


    var mockWines = [
      {
        name: 'Kangaroo Red',
        id: 0,
        pairings: [2]
      },
      {
        name: 'Monkey White',
        id: 1,
        pairings: [1, 3]
      },
      {
        name: 'Turtle Rose',
        id: 2,
        pairings: [0, 2, 3]
      },
      {
        name: 'Badger Blend',
        id: 3,
        pairings: [0, 1, 2]
      }
    ];

    //On next is a way to fire an event and pass data with rx (sometimes just called next) all subscribers
    //to this observable will be notified and the data will be passed to them
    winesObservable.onNext(mockWines);




    //checking for the update pairing action, and updating the mock data accordingly
    actionDispatcher.streams
      .filter(function(action){
      return action.name === 'addWinePairing';
    }).subscribe(function(action){


      //this updates the mock data
      mockWines[action.data.wineID].pairings.push(action.data.cheeseID);

      //this now triggers a new wineList update, and all listeners will react accordingly
      winesObservable.onNext(mockWines);
    })

    return {
      stream: winesObservable.shareReplay(1)
    }

  });