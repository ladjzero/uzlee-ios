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

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "论坛"
    }
  }

  render() {
    return (
      <TabBarIOS>
        <Icon.TabBarItemIOS iconName="ios-list-outline" title="论坛" selected={this.state.selected === '论坛'} onPress={() => {
          this.setState({selected: '论坛'});
        }}><Text>hello world</Text></Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS iconName="ios-bell-outline" title="消息" selected={this.state.selected === '消息'} onPress={() => {
          this.setState({selected: '消息'});
        }} badge="6"><Text>hello world</Text></Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS iconName="ios-person-outline" title="我的" selected={this.state.selected === '我的'} onPress={() => {
          this.setState({selected: '我的'});
        }}><Text>hello world</Text></Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS iconName="ios-gear-outline" title="设置" selected={this.state.selected === '设置'} onPress={() => {
          this.setState({selected: '设置'});
        }}><Text>setting</Text></Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}