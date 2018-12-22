import React, { PureComponent } from 'react';
import { withScreen } from 'react-screen-navigation';
import { bindCallback } from 'rxjs';

class Page3 extends PureComponent {
  render() {
    const { go, back } = this.props;
    return (
      <div className="App">
        <h1>
          页面三
        </h1>
        <button onClick={() => { go('page3') }}>页面三</button>
        <button onClick={() => { back() }}>返回</button>
      </div>
    );
  }
}

export default withScreen(Page3);
