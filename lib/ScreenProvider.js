function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import ScreenContext from './ScreenContext';

var ScreenProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ScreenProvider, _React$Component);

  function ScreenProvider(props) {
    var _this;

    _classCallCheck(this, ScreenProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScreenProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateActiveScreen", function () {
      var _this$props = _this.props,
          searchKey = _this$props.searchKey,
          history = _this$props.history;
      var search = history.location.search;
      var activeScreens = qs.parse(search, {
        ignoreQueryPrefix: true
      })[searchKey] || 0;

      _this.setState({
        activeScreens: activeScreens
      });
    });

    _this.state = {
      activeScreens: 0
    };
    _this._isMounted = false;
    var _this$props2 = _this.props,
        _searchKey = _this$props2.searchKey,
        _history = _this$props2.history,
        container = _this$props2.container;
    _this.unlisten = _history.listen(function (location) {
      if (_this._isMounted) {
        var search = location.search;
        var activeScreens = qs.parse(search, {
          ignoreQueryPrefix: true
        })[_searchKey] || 0;

        _this.setState({
          activeScreens: activeScreens
        });
      }
    });
    _this.dom = document.getElementById(container);

    if (!_this.dom) {
      var div = document.createElement('div');
      div.id = container;
      _this.dom = div;
      document.body.appendChild(_this.dom);
    }

    return _this;
  }

  _createClass(ScreenProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.unlisten) this.unlisten();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          history = _this$props3.history,
          searchKey = _this$props3.searchKey;
      var activeScreens = this.state.activeScreens;
      return React.createElement(ScreenContext.Provider, {
        value: {
          history: history,
          searchKey: searchKey,
          activeScreens: activeScreens,
          target: this.dom,
          updateActiveScreen: this.updateActiveScreen
        }
      }, children);
    }
  }]);

  return ScreenProvider;
}(React.Component);

_defineProperty(ScreenProvider, "propTypes", {
  history: PropTypes.object.isRequired,
  // eslint-disable-line
  container: PropTypes.string,
  searchKey: PropTypes.string,
  children: PropTypes.node
});

_defineProperty(ScreenProvider, "defaultProps", {
  searchKey: 'rsn',
  container: 'screen',
  children: null
});

export default ScreenProvider;