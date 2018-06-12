'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.position = exports.hashChange = exports.withRouter = exports.lastHistory = exports.Switch = exports.Redirect = exports.Prompt = exports.Router = exports.Route = exports.history = undefined;

var _history = require('history');

var _reactRouter = require('react-router');

var position = '#';
var history = (0, _history.createMemoryHistory)();
var lastHistory = {
  pathname: '/',
  search: '',
  hash: '',
  state: undefined,
  key: ''
};
history.listen(function (e) {
  try {
    if (lastHistory.key !== e.key) {
      exports.lastHistory = lastHistory = {
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
  } catch (err) {
    // err
  }
});

//监听触发操作
function hashChange() {
  try {
    var pathname = window.location.href.split(position)[1];
    if (pathname !== lastHistory.pathname) {
      history.push(pathname);
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
    // 浏览器支持onhashchange事件
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
    }, 350);
  }
} catch (err) {
  // err
}

exports.history = history;
exports.Route = _reactRouter.Route;
exports.Router = _reactRouter.Router;
exports.Prompt = _reactRouter.Prompt;
exports.Redirect = _reactRouter.Redirect;
exports.Switch = _reactRouter.Switch;
exports.lastHistory = lastHistory;
exports.withRouter = _reactRouter.withRouter;
exports.hashChange = hashChange;
exports.position = position;