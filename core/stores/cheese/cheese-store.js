'use strict';

angular.module('app')
  .factory('cheeseStore', function (actionDispatcher) {

    var cheeseObservable = new Rx.ReplaySubject(1); //A replay subject that keeps the history of 1 item

    var mockCheeses = [
      {
        name: 'Blue Cheese',
        id: 0
      },
      {
        name: 'Orange Cheese',
        id: 1
      },
      {
        name: 'Black Cheese',
        id: 2
      },
      {
        name: 'Green Cheese',
        id: 3
      }
    ];

    //On next is a way to fire an event and pass data with rx (sometimes just called next) all subscribers
    //to this observable will be notified and the data will be passed to them
    cheeseObservable.onNext(mockCheeses);

    actionDispatcher.streams
      .filter(function (action) {
        return action.name === 'addCheese';
      })
      .pluck('data')
      .map(function (data) {
        return {
          name: data.name,
          id: mockCheeses.length + 1
        }
      })
      .subscribe(function (newCheese) {
        mockCheeses.push(newCheese);
        cheeseObservable.onNext(mockCheeses);
      });

    return {
      stream: cheeseObservable.shareReplay(1)
    }

  });