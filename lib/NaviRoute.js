'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _routerHistory = require('./routerHistory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NaviRoute = function NaviRoute(_ref) {
  var _ref$exact = _ref.exact,
      exact = _ref$exact === undefined ? true : _ref$exact,
      path = _ref.path,
      component = _ref.component,
      render = _ref.render,
      children = _ref.children,
      backgroundColor = _ref.backgroundColor,
      isAnime = _ref.isAnime,
      moveOutFix = _ref.moveOutFix,
      moveInFix = _ref.moveInFix,
      isShowdown = _ref.isShowdown;
  return _react2.default.createElement(_reactNative.View, null);
};
var iw = _reactNative.Dimensions.get('window').width;
var ssc = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
});

NaviRoute = (_temp = _class = function (_React$Component) {
  _inherits(NaviRoute, _React$Component);

  function NaviRoute(props) {
    _classCallCheck(this, NaviRoute);

    var _this = _possibleConstructorReturn(this, (NaviRoute.__proto__ || Object.getPrototypeOf(NaviRoute)).call(this, props));

    _this.moveNowPage = function (x) {
      if (_this.props.isAnime) {
        _reactNative.Animated.spring(_this.state.moveAnime, {
          useNativeDriver: true,
          toValue: x,
          damping: 33,
          stiffness: 300
        }).start();
      } else {
        _this.setState({
          staticAnime: x
        });
      }
    };

    _this.state = {
      nowRoute: false,
      index: _this.props.root ? 1 : 0,
      staticAnime: _this.props.root ? 0 : iw,
      moveAnime: new _reactNative.Animated.Value(_this.props.root ? 0 : iw)
    };
    return _this;
  }

  _createClass(NaviRoute, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var path = this.props.path.replace('*', '');
      this.listen = (0, _routerHistory.historyAddListen)(function (h) {
        var index = 0;
        for (var i = 0; i < h.entries.length; i++) {
          var r = h.entries[i];
          if (r.pathname === path) {
            index = i;
          }
        }
        if (index === h.index && !_this2.state.nowRoute) {
          _this2.setState({
            nowRoute: true,
            index: 1
          }, function () {
            _this2.moveNowPage(0);
          });
        } else if (index > h.index && _this2.state.nowRoute) {
          _this2.setState({
            nowRoute: false,
            index: 0,
            staticAnime: 0,
            moveAnime: new _reactNative.Animated.Value(0)
          }, function () {
            _this2.moveNowPage(iw * _this2.props.moveInFix);
          });
        } else if (index < h.index && _this2.state.nowRoute) {
          _this2.setState({
            nowRoute: false,
            index: 0,
            staticAnime: 0,
            moveAnime: new _reactNative.Animated.Value(0)
          }, function () {
            _this2.moveNowPage(-iw * _this2.props.moveOutFix);
          });
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _routerHistory.historyRemoveListen)(this.listen);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.Animated.View,
        {
          style: [ssc.container, {
            shadowOpacity: 0.07,
            shadowOffset: { width: -3, height: 0 },
            shadowColor: '#000',
            shadowRadius: 0,
            backgroundColor: this.props.backgroundColor,
            zIndex: this.state.index,
            transform: [{
              translateX: this.props.isAnime ? this.state.moveAnime : this.state.staticAnime
            }]
          }]
        },
        _react2.default.createElement(_routerHistory.Route, this.props)
      );
    }
  }]);

  return NaviRoute;
}(_react2.default.Component), _class.defaultProps = {
  moveOutFix: 0.25,
  moveInFix: 1,
  backgroundColor: '#fff',
  isAnime: true,
  isShowdown: true
}, _temp);

exports.default = NaviRoute;