function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import Screen from './Screen';
/**
 * A public higher-order component to access the imperative API
 */

function withScreen(Component) {
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        others = _objectWithoutProperties(props, ["wrappedComponentRef"]);

    return React.createElement(Screen, null, function (childProps) {
      return React.createElement(Component, _extends({}, childProps, others, {
        ref: wrappedComponentRef
      }));
    });
  };

  C.displayName = "withScreen(".concat(Component.displayName || Component.name, ")");
  C.WrappedComponent = Component;

  if (process.env.NODE_ENV) {
    C.propTypes = {
      wrappedComponentRef: PropTypes.func // eslint-disable-line

    };
  }

  return hoistStatics(C, Component);
}

export default withScreen;