'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComponentInstance = exports.sharedState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sharedState = exports.sharedState = function sharedState(C, prop) {
  return function (_React$Component) {
    _inherits(_sharedState, _React$Component);

    function _sharedState(props) {
      _classCallCheck(this, _sharedState);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_sharedState).call(this, props));

      _this._updateState = function (shared) {
        return _this.setState({ shared: shared });
      };

      _this.state = {};

      var store = props[prop];
      getComponentInstance(store).then(function (instance) {
        _this.shareStore = instance;
        _this.shareStore.subscribe(_this._updateState);

        _this.setState({ instance: instance });
      });
      return _this;
    }

    _createClass(_sharedState, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.shareStore && this.shareStore.unsubscribe(this._updateState);
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state;
        var shared = _state.shared;
        var instance = _state.instance;

        return _react2.default.createElement(C, _extends({}, this.props, { _shared: shared, _instance: instance }));
      }
    }]);

    return _sharedState;
  }(_react2.default.Component);
};

var getComponentInstance = exports.getComponentInstance = function getComponentInstance(store) {
  var ms = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];
  return new Promise(function (resolve, reject) {
    return store.instance && resolve(store.instance) || setTimeout(function () {
      return store.instance && resolve(store.instance);
    }, ms);
  });
};