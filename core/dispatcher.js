'use strict';

angular.module('app')
.factory('actionDispatcher', function(){


  var _streams = new Rx.ReplaySubject(1);
  function _dispatch(actionName, data){

    var actionObject = {
      name: actionName,
      data: data
    };
    console.log('Action: ' + actionName + ' fired with: ', data);

    _streams.onNext(actionObject);
  }


  return {
    dispatchAction: _dispatch,
    streams: _streams
  }
});