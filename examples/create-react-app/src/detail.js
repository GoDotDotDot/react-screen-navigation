import React, { Component } from 'react';

class DetaiPage extends Component {
  render() {
    const { params } = this.props;
    console.log(this.props);
    const { id, name } = params;
    return (
      <div className="App">
        <h1>
          这里是详情页面
        </h1>
        <h2>接收到的参数：</h2>
        <h5>id: {id}</h5>
        <h5>name: {name}</h5>
      </div>
    );
  }
}

export default DetaiPage;
