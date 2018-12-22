import React, { Component } from 'react';
import { Screen, withScreen } from 'react-screen-navigation';

import DetailPage from './detail';
import WeeklyPage from './weekly';
import Page3 from './page3';

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
        <Screen path="detail" component={DetailPage} clear={false}/>
        <Screen path="weekly" component={WeeklyPage} />
        <Screen path="page3" component={Page3} />
        <h1>欢迎使用 ReactScreenNavigation</h1>
        <button onClick={this.goToDetailPage}>页面一（带参数）</button>
        <button onClick={this.goToWeeklyPage}>页面二</button>
      </div>
    );
  }
}

export default withScreen(App);
