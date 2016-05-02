import React, {
  AppRegistry,
  Component,
  Navigator,
  NavigatorIOS,
  Text
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import Main from './js/Main.js';
import PostList from './js/PostList.js';
import Login from './js/Login.js';
import YANavigator from 'react-native-ya-navigator';
import User from './js/User.js';
import {COLOR} from './js/utils/Const.js';

class izlee extends Component {
  renderRoute(route, navigator) {
    if (route && route.view == 'PostList') {
      return (
      <PostList navigator={navigator} />
      );
    } else {
      return (<Login navigator={navigator} />);
    }
  }

  render() {
    return (
      <YANavigator
        navBarBackBtn={{textStyle: {color: COLOR.tint}}}
        navBarStyle={{
          backgroundColor: '#f8f8f8',
        }}
        initialRoute={{
          component: Login, 
          title: '',
          leftButtonTitle: '游客访问',
          rightButtonTitle: '注册'
        }} 
        renderScene={(route, navigator) => this.renderRoute(route, navigator)} 
        ref="nav" style={{flex: 1}} />
    );
  }
}

AppRegistry.registerComponent('izlee', () => izlee);
