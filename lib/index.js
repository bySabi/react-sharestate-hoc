'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shareState = require('./share-state');

Object.defineProperty(exports, 'shareStateBind', {
  enumerable: true,
  get: function get() {
    return _shareState.shareStateBind;
  }
});
Object.defineProperty(exports, 'shareState', {
  enumerable: true,
  get: function get() {
    return _shareState.shareState;
  }
});

var _sharedState = require('./shared-state');

Object.defineProperty(exports, 'sharedState', {
  enumerable: true,
  get: function get() {
    return _sharedState.sharedState;
  }
});
Object.defineProperty(exports, 'getComponentInstance', {
  enumerable: true,
  get: function get() {
    return _sharedState.getComponentInstance;
  }
});