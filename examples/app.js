import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <ScreenProvider history={history}>
        <Screen path="detail" component={DetaiPage} />
        <Screen path="newPage" component={NewPage} />
      </ScreenProvider>
    );
  }
}

ReactDOM.render(<App />, document.body);
