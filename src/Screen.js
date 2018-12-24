import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames'; // eslint-disable-line
import warning from 'tiny-warning'; // eslint-disable-line
import qs from 'qs';
// eslint-disable-next-line
import { isValidElementType } from 'react-is';

import { checkStack } from './utils/mergeStack';

import ScreenContext from './ScreenContext';

import './style.css';

const screenStack = [];
const paramsStack = {};
let detectId;

function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}

class Screen extends React.PureComponent {
  static propTypes = {
    clear: PropTypes.bool,
    keepState: PropTypes.bool,
    path: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    component: (props, propName) => {
      // eslint-disable-line
      if (props[propName] && !isValidElementType(props[propName])) {
        return new Error(
          "Invalid prop 'component' supplied to 'Screen': the prop is not a valid React component",
        );
      }
    },
  };

  static defaultProps = {
    children: null,
    component: null,
    clear: true,
    keepState: true,
  };

  static contextType = ScreenContext;

  state = {
    update: false,
  };

  params = {};

  actived = false;

  componentDidMount() {
    const { path } = this.props;
    path && this.registScreen(path);
    if (detectId) clearTimeout(detectId);
    detectId = setTimeout(() => {
      const { updateActiveScreen } = this.context;
      updateActiveScreen();
    }, 30);
  }

  go = (path, params) => {
    if (!checkStack(screenStack, { path })) {
      console.warn(`this screen ${path} is not found!`);
      return false;
    }
    const { history, searchKey } = this.context;

    const { search } = history.location;
    const serachObj = qs.parse(search, { ignoreQueryPrefix: true });
    const lastActivedScreens = serachObj[searchKey] || 0;
    const idx = screenStack.findIndex(ele => ele.path === path);
    const activeScreens = lastActivedScreens | Math.pow(2, idx); // eslint-disable-line
    paramsStack[path] = params;
    serachObj[searchKey] = activeScreens;
    const { keepState } = this.props;
    history.push(`?${qs.stringify(Object.assign({}, serachObj, keepState ? params : null))}`);
    return null;
  };

  back = (n = -1) => {
    const { history } = this.context;
    history.go(n);
  };

  /* eslint-disable */
  registScreen(path) {
    const { length } = screenStack;
    screenStack.push({
      path,
      activedScreen: Math.pow(2, length),
    });
  }
  /* eslint-enable */

  renderPortalScreen(ScreenComponent, props) {
    const { wrapedClassName } = this.props;
    const cls = classnames('rsn-screen', 'rsn-in', wrapedClassName);
    this.actived = true;
    return ReactDom.createPortal(
      <div className={cls}>
        <ScreenComponent {...props} />
      </div>,
      this.dom,
    );
  }

  renderRemoveScreen(ScreenComponent, props, time) {
    const cls = classnames('rsn-screen', 'rsn-out');
    if (props.clear) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        if (!this.timeout) {
          this.timeout = true;
          this.forceUpdate();
        }
      }, time);
    }
    return ReactDom.createPortal(
      <div className={cls}>
        <ScreenComponent {...props} />
      </div>,
      this.dom,
    );
  }

  renderScreen(children, props) {
    const { component: ScreenComponent, clear } = this.props;
    const { render } = this.state;
    if (children && !isEmptyChildren(children)) {
      return children;
    }
    if (props.match) {
      this.timeout = false;
      // 需要进场
      if (ScreenComponent) {
        return this.renderPortalScreen(ScreenComponent, props);
      }
      if (render) {
        return this.renderPortalScreen(render(props), props);
      }
      return null;
    }
    // 需要出场
    if (this.actived) {
      // 动画时间到并且需要清除dom
      if (this.timeout && clear) {
        return null;
      }
      return this.renderRemoveScreen(ScreenComponent, props, 500);
    }
    return null;
  }

  render() {
    return (
      <ScreenContext.Consumer>
        {(context) => {
          // eslint-disable-next-line
          let { children, path, keepState, ...others } = this.props;
          this.dom = context.target;
          const { activeScreens, history } = context;
          const idx = screenStack.findIndex(ele => ele.path === path);
          // eslint-disable-next-line
          const match =
            idx !== undefined ? Boolean(parseInt(activeScreens) & Math.pow(2, idx)) : false;

          if (Array.isArray(children) && children.length === 0) {
            children = null;
          }
          const props = {
            ...others,
            match,
            ...context,
            go: this.go,
            back: this.back,
            params:
              paramsStack[path] || keepState
                ? qs.parse(history.location.search, { ignoreQueryPrefix: true })
                : {},
          };
          if (typeof children === 'function') {
            children = children(props);

            if (children === undefined) {
              /* eslint-disable */
              if (process.env.NODE_ENV === 'development') {
                warning(
                  false,
                  'You returned `undefined` from the `children` function of ' +
                    `<Screen${path ? ` path="${path}"` : ''}>, but you ` +
                    'should have returned a React element or `null`',
                );
              }
              /* eslint-enable */

              children = null;
            }
          }

          return (
            <ScreenContext.Provider value={context}>
              {this.renderScreen(children, props)}
            </ScreenContext.Provider>
          );
        }}
      </ScreenContext.Consumer>
    );
  }
}

export default Screen;
