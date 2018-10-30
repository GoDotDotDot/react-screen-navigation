import React from 'react';
import classnames from 'classnames';

import './style.css';

class Screen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.stopPopsState = this.stopPopsState.bind(this);
  }

  componentDidMount() {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', this.stopPopsState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.stopPopsState);
  }

  stopPopsState() {
    const { rsnref } = this.props;
    if (rsnref) {
      rsnref.back();
    }
  }

  render() {
    const { children, className, rsnref, ...others } = this.props; // eslint-disable-line
    const cls = classnames(['rsn-screen', className]);
    return (
      <div {...others} className={cls}>
        {children}
      </div>
    );
  }
}

export default Screen;
