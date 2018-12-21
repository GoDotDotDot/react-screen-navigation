/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import ScreenContext from './ScreenContext';

class ScreenProvider extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line
    container: PropTypes.string,
    searchKey: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    searchKey: 'rsn',
    container: 'screen',
    children: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeScreens: 0,
    };

    this._isMounted = false;

    const { searchKey, history, container } = this.props;
    this.unlisten = history.listen(location => {
      if (this._isMounted) {
        const { search } = location;
        const activeScreens = qs.parse(search, { ignoreQueryPrefix: true })[searchKey] || 0;
        this.setState({ activeScreens });
      }
    });

    this.dom = document.getElementById(container);
    if (!this.dom) {
      const div = document.createElement('div');
      div.id = container;
      this.dom = div;
      document.body.appendChild(this.dom);
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  }

  updateActiveScreen = () => {
    const { searchKey, history } = this.props;
    const { search } = history.location;

    const activeScreens = qs.parse(search, { ignoreQueryPrefix: true })[searchKey] || 0;
    this.setState({ activeScreens });
  }

  render() {
    const { children, history, searchKey } = this.props;
    const { activeScreens } = this.state;
    return (
      <ScreenContext.Provider
        value={{
          history,
          searchKey,
          activeScreens,
          target: this.dom,
          updateActiveScreen: this.updateActiveScreen,
        }}
      >
      {children}
      </ScreenContext.Provider>
    );
  }
}

export default ScreenProvider;
