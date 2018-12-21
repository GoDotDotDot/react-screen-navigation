import React, { Component } from 'react';
import { Screen, withScreen } from 'react-screen-navigation';

import DetailPage from './detail';
import WeeklyPage from './weekly';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  goToDetailPage = () => {
    const { go } = this.props;
    go("detail", { id: 1, name: 'godotdotdot'})
  }
  goToWeeklyPage = () => {
    const { go } = this.props;
    go("weekly")
  }
  render() {
    return (
      <div className="App">
        <Screen path="detail" component={DetailPage} />
        <Screen path="weekly" component={WeeklyPage} />
        <h1>欢迎使用 ReactScreenNavigation</h1>
        <button onClick={this.goToDetailPage}>查看详情</button>
        <button onClick={this.goToWeeklyPage}>新建周报</button>
      </div>
    );
  }
}

export default withScreen(App);
