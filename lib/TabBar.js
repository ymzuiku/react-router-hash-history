'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _routerHistory = require('./routerHistory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabBarItem = function (_React$PureComponent) {
  _inherits(TabBarItem, _React$PureComponent);

  function TabBarItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TabBarItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TabBarItem.__proto__ || Object.getPrototypeOf(TabBarItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnPress = function () {
      if (_this.props.onPress) {
        _this.props.onPress();
      }
      _routerHistory.history.push(_this.props.path, _this.props.state);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TabBarItem, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.TouchableOpacity,
        { style: ssc.item, onPress: this.handleOnPress },
        _react2.default.createElement(
          _reactNative.Text,
          null,
          this.props.title
        )
      );
    }
  }]);

  return TabBarItem;
}(_react2.default.PureComponent);

var TabBar = function (_React$Component) {
  _inherits(TabBar, _React$Component);

  function TabBar() {
    _classCallCheck(this, TabBar);

    return _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).apply(this, arguments));
  }

  _createClass(TabBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.View,
        {
          style: [ssc.container, {
            maxHeight: !this.props.isIPhoneX ? 48 : 60,
            minHeight: !this.props.isIPhoneX ? 48 : 60,
            paddingBottom: !this.props.isIPhoneX ? 0 : 22
          }]
        },
        this.props.items.map(function (v, i) {
          return _react2.default.createElement(TabBarItem, _extends({ key: v.title }, v));
        })
      );
    }
  }]);

  return TabBar;
}(_react2.default.Component);

var ssc = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 48,
    minHeight: 48,
    width: '100%',
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  item: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

exports.default = TabBar;