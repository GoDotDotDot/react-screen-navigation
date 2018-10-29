<div align="center">
  <h1>React-Screen-Navigation</h1>
</div>

[![npm version](https://img.shields.io/npm/v/react-screen-navigation.svg)](https://www.npmjs.com/package/react-screen-navigation) [![npm downloads](https://img.shields.io/npm/dt/react-screen-navigation.svg)](https://npm-stat.com/charts.html?package=react-screen-navigation) [![Github All Releases](https://img.shields.io/github/downloads/godotdotdot/react-screen-navigation/total.svg)](https://github.com/GoDotDotDot/react-screen-navigation/releases)

基于React仿原生导航切换效果组件。

![desc](./desc.gif)

第一次手动点击取消按钮完成返回上一级导航

第二次通过点击终端物理返回键出发返回上一级导航

## Features

- 支持移动端物理返回键返回上一页
- 导航切换不影响其他dom结构

## Usage

```jsx
import ReactScreenNavigationConnect from 'react-screen-navigation'

class HomePage extends React.Component {
    
    render(){
       return (
           <div>
               hello
               <ReactScreenNavigationConnect
                  rsnref={ref => {
                    this.rsnref = ref;
                  }}
                  screens={[
                    {
                      key: 'detail',
                      component: DetailComponent,
                      props: {
                        className: 'detail-page'
                      },
                      className: 'detail-page-wraper'
                    }
                  ]}
                />
           </div>
       ) 
    }
}
```

## API

### go(key, params)

导航至目标导航页面

| 参数   | 类型   | 备注                       |
| ------ | ------ | -------------------------- |
| key    | string | screen标志字符，名称       |
| params | any    | 用户传递给screen页面的参数 |

`params` 对象可以通过导航页面组件的`props.params`对象获取。

### back()

返回操作，该操作将用于导航出栈操作。

## Props

### rsnref: function

该属性为函数，函数第一个形参为该组件暴露出来的API对象。如示例所示：可以通过`this.rsnref.go(...)`进行导航跳转操作

### container: string

导航页面创建所需的容器Dom id。默认为`screen`。

### screens: array/object

需要注册的`screen`对象，该属性可接受`array`和`object`。

`screen`对象为一个对象，该对象具体见下表：

| 名称      | 类型            | 备注                       |
| --------- | --------------- | -------------------------- |
| key       | string          | screen标志字符，名称       |
| component | React Component | 导航页面需要显示的组件     |
| calssName | string          | 传递给包裹component的      |
| props     | object          | 传递给component组件的props |

## 期望

后期准备加入动画控制等功能。



