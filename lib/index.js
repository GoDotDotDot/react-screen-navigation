function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint-disable */
import React from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import { checkStack, mergeStack } from './utils/mergeStack';
import Screen from './screen';
var screenStack = [];

var ReactScreenNavigationConnect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactScreenNavigationConnect, _React$Component);

  function ReactScreenNavigationConnect(props) {
    var _this;

    _classCallCheck(this, ReactScreenNavigationConnect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactScreenNavigationConnect).call(this, props));
    var _this$props = _this.props,
        screens = _this$props.screens,
        _this$props$container = _this$props.container,
        container = _this$props$container === void 0 ? 'screen' : _this$props$container;
    screenStack = mergeStack(screenStack, screens);
    _this.dom = document.getElementById(container);

    if (!_this.dom) {
      var div = document.createElement('div');
      div.id = container;
      _this.dom = div;
      document.body.appendChild(_this.dom);
    }

    return _this;
  }

  _createClass(ReactScreenNavigationConnect, [{
    key: "render",
    value: function render() {
      var rsnref = this.props.rsnref;
      return ReactDom.createPortal(React.createElement(ReactScreenNavigation, {
        ref: rsnref
      }), this.dom);
    }
  }]);

  return ReactScreenNavigationConnect;
}(React.Component);

var ReactScreenNavigation =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ReactScreenNavigation, _React$Component2);

  function ReactScreenNavigation() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, ReactScreenNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ReactScreenNavigation)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      screens: screenStack,
      stack: []
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "go", function (screen, params) {
      var screens = _this2.state.screens;

      if (!checkStack(screens, {
        key: screen
      })) {
        console.warn("this screen ".concat(screen, " is not found!"));
        return false;
      }

      var stack = _this2.pushScreenToStack(screen, params);

      _this2.setState({
        stack: stack
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "back", function () {
      var stack = _this2.state.stack;
      var length = stack.length;

      if (length === 0) {
        console.error('the navigation stack is empty!');
        return false;
      }

      var willPopScreen = stack[length - 1];
      willPopScreen.status = 'out';

      _this2.setState({
        stack: stack
      });

      window.setTimeout(function () {
        stack.pop();

        _this2.setState({
          stack: stack
        });
      }, 300);
    });

    return _this2;
  }

  _createClass(ReactScreenNavigation, [{
    key: "getScreenByKey",
    value: function getScreenByKey(key) {
      var screens = this.state.screens;
      return screens.filter(function (e) {
        return e.key === key;
      })[0];
    }
  }, {
    key: "pushScreenToStack",
    value: function pushScreenToStack(screenKey, params) {
      var screen = this.getScreenByKey(screenKey);
      screen.status = 'in';
      screen.params = params;
      var stack = this.state.stack;
      return _toConsumableArray(stack).concat([screen]);
    }
  }, {
    key: "exportMethod",
    value: function exportMethod() {
      var go = this.go,
          back = this.back;
      return {
        go: go,
        back: back
      };
    }
  }, {
    key: "render",
    value: function render() {
      var stack = this.state.stack;
      var methods = this.exportMethod();
      return React.createElement(React.Fragment, null, stack.map(function (e) {
        var ScreenItem = e.component;
        var _e$props = e.props,
            props = _e$props === void 0 ? {} : _e$props,
            className = e.className,
            params = e.params;
        var screenCls = classnames([className, {
          'rsn-in': e.status === 'in',
          'rsn-out': e.status === 'out'
        }]);
        return React.createElement(Screen, {
          rsnref: methods,
          key: e.key,
          className: screenCls
        }, React.createElement(ScreenItem, _extends({
          rsnref: methods
        }, props, {
          params: params
        })));
      }));
    }
  }]);

  return ReactScreenNavigation;
}(React.Component);

export default ReactScreenNavigationConnect;