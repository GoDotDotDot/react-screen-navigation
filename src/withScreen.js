import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

import Screen from './Screen';

/**
 * A public higher-order component to access the imperative API
 */
function withScreen(Component) {
  const C = props => {
    const { wrappedComponentRef, ...others } = props;

    return (
      <Screen>
        {childProps => (
          <Component {...childProps} {...others} ref={wrappedComponentRef} />
        )}
      </Screen>
    );
  };

  C.displayName = `withScreen(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;

  if (process.env.NODE_ENV) {
    C.propTypes = {
      wrappedComponentRef: PropTypes.func, // eslint-disable-line
    };
  }

  return hoistStatics(C, Component);
}

export default withScreen;
