import React from 'react';
import { createMemoryHistory } from 'history';
import {
  Route,
  Router,
  Prompt,
  Redirect as ReactRedirect,
  Switch,
  withRouter
} from 'react-router';

let position = '#';
let history = createMemoryHistory();
let lastHistory = {
  pathname: '/',
  search: '',
  hash: '',
  state: undefined,
  key: ''
};
history.listen(e => {
  try {
    if (lastHistory.key !== e.key) {
      lastHistory = {
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
  } catch (err) {}
});

//监听触发操作
function hashChange() {
  try {
    let pathname = window.location.href.split(position)[1];
    if (pathname !== lastHistory.pathname) {
      history.push(pathname);
    }
  } catch (err) {}
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
  if (
    'onhashchange' in window &&
    (typeof document.documentMode === 'undefined' ||
      document.documentMode === 8)
  ) {
    // 浏览器支持onhashchange事件
    window.onhashchange = hashChange; // TODO，对应新的hash执行的操作函数
  } else {
    let oldHash = window.location.hash;
    function isHashChanged() {
      return oldHash === window.location.hash;
    }
    // 不支持则用定时器检测的办法
    setInterval(function() {
      // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
      var ischanged = isHashChanged();
      if (ischanged) {
        hashChange(); // TODO，对应新的hash执行的操作函数
      }
    }, 350);
  }
} catch (err) {}

function Redirect({ ...props }) {
  // 去除相同路由的错误
  if (props.to === history.location.pathname) {
    return null;
  }
  return <ReactRedirect {...props} />;
}

function RootRouter({ ...props }) {
  return <Router history={history} {...props} />;
}

export {
  history,
  Route,
  Router,
  RootRouter,
  Prompt,
  Redirect,
  Switch,
  lastHistory,
  withRouter,
  hashChange,
  position
};
