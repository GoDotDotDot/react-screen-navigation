function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames'; // eslint-disable-line

import warning from 'tiny-warning'; // eslint-disable-line

import qs from 'qs'; // eslint-disable-next-line

import { isValidElementType } from 'react-is';
import { checkStack } from './utils/mergeStack';
import ScreenContext from './ScreenContext';
import './style.css';
var screenStack = [];
var paramsStack = {};
var detectId;

function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}

var Screen =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Screen, _React$PureComponent);

  function Screen() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Screen);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Screen)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      update: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "params", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "actived", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "go", function (path, params) {
      if (!checkStack(screenStack, {
        path: path
      })) {
        console.warn("this screen ".concat(path, " is not found!"));
        return false;
      }

      var _this$context = _this.context,
          history = _this$context.history,
          searchKey = _this$context.searchKey;
      var search = history.location.search;
      var serachObj = qs.parse(search, {
        ignoreQueryPrefix: true
      });
      var lastActivedScreens = serachObj[searchKey] || 0;
      var idx = screenStack.findIndex(function (ele) {
        return ele.path === path;
      });
      var activeScreens = lastActivedScreens | Math.pow(2, idx); // eslint-disable-line

      paramsStack[path] = params;
      serachObj[searchKey] = activeScreens;
      var keepState = _this.props.keepState;
      history.push("?".concat(qs.stringify(Object.assign({}, serachObj, keepState ? params : null))));
      return null;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "back", function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var history = _this.context.history;
      history.go(n);
    });

    return _this;
  }

  _createClass(Screen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var path = this.props.path;
      path && this.registScreen(path);
      if (detectId) clearTimeout(detectId);
      detectId = setTimeout(function () {
        var updateActiveScreen = _this2.context.updateActiveScreen;
        updateActiveScreen();
      }, 30);
    }
  }, {
    key: "registScreen",

    /* eslint-disable */
    value: function registScreen(path) {
      var length = screenStack.length;
      screenStack.push({
        path: path,
        activedScreen: Math.pow(2, length)
      });
    }
    /* eslint-enable */

  }, {
    key: "renderPortalScreen",
    value: function renderPortalScreen(ScreenComponent, props) {
      var wrapedClassName = this.props.wrapedClassName;
      var cls = classnames('rsn-screen', 'rsn-in', wrapedClassName);
      this.actived = true;
      return ReactDom.createPortal(React.createElement("div", {
        className: cls
      }, React.createElement(ScreenComponent, props)), this.dom);
    }
  }, {
    key: "renderRemoveScreen",
    value: function renderRemoveScreen(ScreenComponent, props, time) {
      var _this3 = this;

      var cls = classnames('rsn-screen', 'rsn-out');

      if (props.clear) {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(function () {
          if (!_this3.timeout) {
            _this3.timeout = true;

            _this3.forceUpdate();
          }
        }, time);
      }

      return ReactDom.createPortal(React.createElement("div", {
        className: cls
      }, React.createElement(ScreenComponent, props)), this.dom);
    }
  }, {
    key: "renderScreen",
    value: function renderScreen(children, props) {
      var _this$props = this.props,
          ScreenComponent = _this$props.component,
          clear = _this$props.clear;
      var render = this.state.render;

      if (children && !isEmptyChildren(children)) {
        return children;
      }

      if (props.match) {
        this.timeout = false; // 需要进场

        if (ScreenComponent) {
          return this.renderPortalScreen(ScreenComponent, props);
        }

        if (render) {
          return this.renderPortalScreen(render(props), props);
        }

        return null;
      } // 需要出场


      if (this.actived) {
        // 动画时间到并且需要清除dom
        if (this.timeout && clear) {
          return null;
        }

        return this.renderRemoveScreen(ScreenComponent, props, 500);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(ScreenContext.Consumer, null, function (context) {
        // eslint-disable-next-line
        var _this4$props = _this4.props,
            children = _this4$props.children,
            path = _this4$props.path,
            keepState = _this4$props.keepState,
            others = _objectWithoutProperties(_this4$props, ["children", "path", "keepState"]);

        _this4.dom = context.target;
        var activeScreens = context.activeScreens,
            history = context.history;
        var idx = screenStack.findIndex(function (ele) {
          return ele.path === path;
        }); // eslint-disable-next-line

        var match = idx !== undefined ? Boolean(parseInt(activeScreens) & Math.pow(2, idx)) : false;

        if (Array.isArray(children) && children.length === 0) {
          children = null;
        }

        var props = _objectSpread({}, others, {
          match: match
        }, context, {
          go: _this4.go,
          back: _this4.back,
          params: paramsStack[path] || (keepState ? qs.parse(history.location.search, {
            ignoreQueryPrefix: true
          }) : {})
        });

        if (typeof children === 'function') {
          children = children(props);

          if (children === undefined) {
            /* eslint-disable */
            if (process.env.NODE_ENV === 'development') {
              warning(false, 'You returned `undefined` from the `children` function of ' + "<Screen".concat(path ? " path=\"".concat(path, "\"") : '', ">, but you ") + 'should have returned a React element or `null`');
            }
            /* eslint-enable */


            children = null;
          }
        }

        return React.createElement(ScreenContext.Provider, {
          value: context
        }, _this4.renderScreen(children, props));
      });
    }
  }]);

  return Screen;
}(React.PureComponent);

_defineProperty(Screen, "propTypes", {
  clear: PropTypes.bool,
  keepState: PropTypes.bool,
  path: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  component: function component(props, propName) {
    // eslint-disable-line
    if (props[propName] && !isValidElementType(props[propName])) {
      return new Error("Invalid prop 'component' supplied to 'Screen': the prop is not a valid React component");
    }
  }
});

_defineProperty(Screen, "defaultProps", {
  children: null,
  component: null,
  clear: true,
  keepState: true
});

_defineProperty(Screen, "contextType", ScreenContext);

export default Screen;