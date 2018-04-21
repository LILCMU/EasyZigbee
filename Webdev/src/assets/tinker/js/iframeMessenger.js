'use strict';

var IframeMessenger = {};

IframeMessenger.sendMessage = function(msg) {
  // Make sure you are sending a string, and to stringify JSON
  window.parent.postMessage(msg, '*');
};

IframeMessenger.onReceiveMessage = function(msg) {


};

function bindEvent(element, eventName, eventHandler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, eventHandler);
  }
}

bindEvent(window, 'message', function(e) {
  var msg = e.data;
  // console.log();
  // console.log(msg);

  if (msg == undefined) {
    setIconStatus(0);
  } else if (msg.info && msg.info.boardType===0) {
    setIconStatus('connect');
  } else if (msg.info && msg.info.boardType) {
    setIconStatus('on');
  }
  // IframeMessenger.onReceiveMessage(e.data)
});
