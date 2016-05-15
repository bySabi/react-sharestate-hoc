'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shareState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.shareStateBind = shareStateBind;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function shareStateBind(C) {
  var props = void 0;
  var _shareStateBind = void 0;

  if (_react2.default.isValidElement(C)) {
    props = C.props;
    _shareStateBind = function _shareStateBind(props) {
      return _react2.default.cloneElement(C, _extends({}, props));
    };
  } else {
    _shareStateBind = C;
  }

  return _react2.default.createElement(shareState(_shareStateBind, this), props);
}

var shareState = exports.shareState = function shareState(C, store) {
  if (store.instance) {
    return (0, _warning2.default)(true, "Already set component '%s'", store.name);
  }

  store.init = function (value) {
    return store.instance = value;
  };

  return function (_React$Component) {
    _inherits(_shareState, _React$Component);

    function _shareState(props) {
      _classCallCheck(this, _shareState);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_shareState).call(this, props));

      _this.notifyAll = function (state) {
        return _this.listeners.forEach(function (listener) {
          return listener(state);
        });
      };

      store.init(_this);
      _this.listeners = new Set();
      return _this;
    }

    _createClass(_shareState, [{
      key: 'subscribe',
      value: function subscribe(listener) {
        this.listeners.add(listener);
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(listener) {
        this.listeners.delete(listener);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(C, _extends({}, this.props, { _setShareState: this.notifyAll, _shareStore: store }));
      }
    }]);

    return _shareState;
  }(_react2.default.Component);
};