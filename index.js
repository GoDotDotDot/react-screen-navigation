// eslint-disable-next-line
import React from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import { checkStack, mergeStack } from './utils/mergeStack';

import Screen from './screen';

// eslint-disable-next-line
let screenStack = [];

// eslint-disable-next-line
class ReactScreenNavigationConnect extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    const { screens, container = 'screen' } = this.props;
    screenStack = mergeStack(screenStack, screens);

    this.dom = document.getElementById(container);
    if (!this.dom) {
      const div = document.createElement('div');
      div.id = container;
      this.dom = div;
      document.body.appendChild(this.dom);
    }
  }

  render() {
    const { rsnref } = this.props; // eslint-disable-line
    return ReactDom.createPortal(
      <ReactScreenNavigation ref={rsnref} />,
      this.dom,
    );
  }
}

class ReactScreenNavigation extends React.Component {
  state = {
    screens: screenStack,
    stack: [],
  };
  /**
   * stack: Array
   *  {
   *    status: 'in' || 'out',
   *    key: '' // 当前screen名称,
   *  }
   */

  getScreenByKey(key) {
    const { screens } = this.state;
    return screens.filter(e => e.key === key)[0];
  }

  // eslint-disable-next-line
  go = (screen, params) => {
    const { screens } = this.state;
    if (!checkStack(screens, { key: screen })) {
      console.warn(`this screen ${screen} is not found!`);
      return false;
    }
    const stack = this.pushScreenToStack(screen, params);
    this.setState({ stack });
  };

  // eslint-disable-next-line
  back = () => {
    const { stack } = this.state;
    const { length } = stack;
    if (length === 0) {
      console.error('the navigation stack is empty!');
      return false;
    }
    const willPopScreen = stack[length - 1];
    willPopScreen.status = 'out';
    this.setState({ stack });
    window.setTimeout(() => {
      stack.pop();
      this.setState({ stack });
    }, 300);
  };

  pushScreenToStack(screenKey, params) {
    const screen = this.getScreenByKey(screenKey);
    screen.status = 'in';
    screen.params = params;
    const { stack } = this.state;
    return [...stack, screen];
  }

  exportMethod() {
    const { go, back } = this;
    return { go, back };
  }

  render() {
    const { stack } = this.state;
    const methods = this.exportMethod();

    return (
      <React.Fragment>
        {stack.map(e => {
          const ScreenItem = e.component;
          const { props = {}, className, params } = e;
          const screenCls = classnames([
            className,
            {
              'rsn-in': e.status === 'in',
              'rsn-out': e.status === 'out',
            },
          ]);
          return (
            <Screen rsnref={methods} key={e.key} className={screenCls}>
              <ScreenItem rsnref={methods} {...props} params={params} />
            </Screen>
          );
        })}
      </React.Fragment>
    );
  }
}

export default ReactScreenNavigationConnect;
