/*global chrome:true*/

'use strict';

console.log('Connecting to tab-server-host...');

var port = chrome.runtime.connectNative('com.beaugunderson.tab_server_host');

port.onMessage.addListener(function (msg) {
  console.log('received', msg);

  if (msg.command === 'windows') {
    chrome.windows.getAll({populate: true}, function (windows) {
      console.log('sending response');

      port.postMessage({
        response: 'windows',
        windows: windows
      });
    });
  }

  if (msg.command === 'focus') {
    chrome.tabs.update(msg.tab, {active: true});
    chrome.windows.update(msg.window, {focused: true});
  }
});

port.onDisconnect.addListener(function (e) {
  console.log('disconnected', e);
});
