/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */



import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';

import Main from './js/Main.js';
import Test from './js/Test.js';

var NavigationBarRouteMapper = {
  LeftButton: () => <Text>back</Text>,
  RightButton: () => <Text>dd</Text>,
  Title: () => <Text>Title</Text>
};

class izlee extends Component {
  render() {
    return (
      <NavigatorIOS renderScene={(route, navigator) => <Main></Main>} style={{flex:1}}
       initialRoute={{
        title: 'Main',
        component: Main
      }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('izlee', () => izlee);
