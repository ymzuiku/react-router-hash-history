'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.position = exports.historyRemoveListen = exports.historyAddListen = exports.hashChange = exports.withRouter = exports.nowHistory = exports.Switch = exports.Redirect = exports.Prompt = exports.RootRouter = exports.Router = exports.Route = exports.history = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _history = require('history');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var position = '#';
var history = (0, _history.createMemoryHistory)();
var nowHistory = {
  index: 0,
  length: 1,
  pathname: '/',
  search: '',
  hash: '',
  state: undefined,
  key: ''
};

var historyListenFuncs = {};
var historyListenFuncsLength = 0;
var historyAddListen = function historyAddListen(func) {
  historyListenFuncsLength += 1;
  historyListenFuncs[historyListenFuncsLength] = func;
  return historyListenFuncsLength;
};
var historyRemoveListen = function historyRemoveListen(i) {
  historyListenFuncs[i] = undefined;
};
history.listen(function (e) {
  try {
    if (nowHistory.key !== e.key) {
      exports.nowHistory = nowHistory = {
        index: history.index,
        length: history.length,
        pathname: e.pathname,
        search: e.search,
        hash: e.hash,
        state: e.state,
        key: e.key
      };
      if (window.location) {
        window.location.href = position + e.pathname;
      }
    }
    for (var key in historyListenFuncs) {
      if (historyListenFuncs[key]) {
        historyListenFuncs[key](e, history);
      }
    }
  } catch (err) {
    // err
  }
});

// history.
//监听触发操作
function hashChange() {
  try {
    var pathname = window.location.href.split(position)[1];
    if (pathname !== nowHistory.pathname) {
      if (history.entries.length > 1) {
        if (pathname === history.entries[history.entries.length - 2].pathname) {
          history.goBack();
          history.entries = history.entries.splice(history.entries.length - 2);
          history.entries.length -= 1;
          // history.go(history.entries.length - 2)
        }
      } else {
        history.push(pathname);
      }
    }
  } catch (err) {
    // err
  }
}

if (!window.location) {
  window.location = {
    href: '',
    hash: '',
    pathname: '',
    hostname: '',
    port: ''
  };
}

try {
  //url变化监听器
  if ('onhashchange' in window && (typeof document.documentMode === 'undefined' || document.documentMode === 8)) {
    // 浏览器支持 onhashchange 事件
    window.onhashchange = hashChange; // TODO，对应新的hash执行的操作函数
  } else {
    var isHashChanged = function isHashChanged() {
      return oldHash === window.location.hash;
    };

    // 不支持则用定时器检测的办法


    var oldHash = window.location.hash;

    setInterval(function () {
      // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
      var ischanged = isHashChanged();
      if (ischanged) {
        // 对应新的hash执行的操作函数
        hashChange();
      }
    }, 300);
  }
} catch (err) {
  // err
}

var RootRouter = function RootRouter(_ref) {
  var props = _objectWithoutProperties(_ref, []);

  return _react2.default.createElement(_reactRouter.Router, _extends({ history: history }, props));
};

var Route = function Route(_ref2) {
  var path = _ref2.path,
      component = _ref2.component,
      render = _ref2.render,
      children = _ref2.children,
      props = _objectWithoutProperties(_ref2, ['path', 'component', 'render', 'children']);

  renderChilden = function renderChilden() {
    return children;
  };
  return _react2.default.createElement(_reactRouter.Route, _extends({
    exact: true,
    path: path,
    component: component,
    render: render || undefined.renderChilden
  }, props));
};

exports.history = history;
exports.Route = Route;
exports.Router = _reactRouter.Router;
exports.RootRouter = RootRouter;
exports.Prompt = _reactRouter.Prompt;
exports.Redirect = _reactRouter.Redirect;
exports.Switch = _reactRouter.Switch;
exports.nowHistory = nowHistory;
exports.withRouter = _reactRouter.withRouter;
exports.hashChange = hashChange;
exports.historyAddListen = historyAddListen;
exports.historyRemoveListen = historyRemoveListen;
exports.position = position;