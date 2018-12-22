import React, { PureComponent } from 'react';
import { withScreen } from 'react-screen-navigation';
class WeeklyPage extends PureComponent {
  render() {
    const { go } = this.props;
    return (
      <div className="App">
        <h1>
          页面二
        </h1>
        <button onClick={() => { go('page3') }}>页面三</button>
      </div>
    );
  }
}

export default withScreen(WeeklyPage);
