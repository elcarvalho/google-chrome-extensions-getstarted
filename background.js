'use strict';

const logMessage = message => {
  return function() {
    console.log(message);
  };
};

const setStorage = (dataObject, callback) => {
  return function() {
    chrome.storage.sync.set(dataObject, callback);
  };
};

const setDeclarativeContent = (eventName, actionName, options, callback) => {
  return function() {
    chrome.declarativeContent[eventName][actionName](options, callback);
  };
};

const registerListeners = listeners => {
  listeners.forEach(listener => {
    chrome.runtime.onInstalled.addListener(listener);
  });
};

const storage = setStorage(
  { color: '#3aa757' },
  logMessage('The color is green.')
);

const addRulesOptions = [
  {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' }
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }
];

const addRules = setDeclarativeContent(
  'onPageChanged',
  'addRules',
  addRulesOptions
);

const removeRules = setDeclarativeContent(
  'onPageChanged',
  'removeRules',
  undefined,
  addRules
);

registerListeners([storage, removeRules]);
