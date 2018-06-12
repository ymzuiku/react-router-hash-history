'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _routerHistory = require('./routerHistory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NaviBar = function (_React$Component) {
  _inherits(NaviBar, _React$Component);

  function NaviBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NaviBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NaviBar.__proto__ || Object.getPrototypeOf(NaviBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      canGoBack: false,
      nowTitle: undefined,
      lastTitle: undefined
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NaviBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.historyAddListenID = (0, _routerHistory.historyAddListen)(function () {
        _this2.setState({
          canGoBack: _routerHistory.history.index > 1
        });
        _this2.setState({
          nowTitle: _routerHistory.history.entries[_routerHistory.history.index] && _routerHistory.history.entries[_routerHistory.history.index].state.title
        });
        _this2.setState({
          lastTitle: _routerHistory.history.entries[_routerHistory.history.index - 1] && '< ' + _routerHistory.history.entries[_routerHistory.history.index - 1].state.title
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _routerHistory.historyRemoveListen)(this.historyAddListenID);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.View,
        {
          style: [ssc.container, this.props.style, {
            marginTop: !this.props.isIPhoneX ? 20 : 20 + 22
          }]
        },
        this.state.canGoBack && this.props.leftButton(this.state.lastTitle || this.props.defaultLastTitle),
        this.props.title(this.state.nowTitle || this.props.defaultTitle),
        this.props.rightButton()
      );
    }
  }]);

  return NaviBar;
}(_react2.default.Component);

NaviBar.defaultProps = {
  defaultLastTitle: '< goback',
  defaultTitle: 'home',
  title: function title(str) {
    return _react2.default.createElement(
      _reactNative.Text,
      null,
      str
    );
  },
  leftButton: function leftButton(str) {
    return _react2.default.createElement(
      _reactNative.TouchableOpacity,
      {
        onPress: function onPress() {
          _routerHistory.history.goBack();
        },
        style: ssc.leftButton
      },
      _react2.default.createElement(
        _reactNative.Text,
        null,
        str
      )
    );
  },
  rightButton: function rightButton() {
    return null;
  }
};


var ssc = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    maxHeight: 48,
    minHeight: 48,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftButton: {
    position: 'absolute',
    left: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightButton: {
    position: 'absolute',
    right: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

exports.default = NaviBar;