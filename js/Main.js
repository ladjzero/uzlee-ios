import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  SegmentedControlIOS,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import ThreadList from './ThreadList.js';
import Test from './Test.js';
import Alerts from './Alerts.js';
import Mines from './Mines.js';
import Login from './Login.js';
import YANavigator from 'react-native-ya-navigator';
import Edit from './Edit.js';
import {COLOR} from './utils/Const.js';

const TABS = [{
  title: '论坛'
}, {
  title: '消息',
  segments: ['短信', '提醒']
}, {
  title: '我的',
  segments: ['主题', '回复', '收藏']
}, {
  title: '设置'
}];

export default class Main extends Component {
  static navigationDelegate = {
    id: 'MainPage',
    renderNavBarRightPart(props) {
      return <View />;
    },
    renderTitle(props) {
      return <View />;
    }
  }

  toggleForumPicker() {
    this.setState({showForumPicker: true});
  }
  
  newThread() {
    this.props.navigator.push({component: Edit});
  }

  setSelected(index) {
    this.setState({selected: index});

    var title, rightPart;

    switch(index) {
      case 0:
        title = <View style={{flex: 1, flexDirectioni: 'row'}}><Text>Discovery</Text><Icon name="ios-plus-empty" size={30}/></View>;
        rightPart = <TouchableOpacity activeOpacity={0.5}><Icon activeOpacity={0.5} underlayColor="red" onPress={() => 'newThread'} name="ios-plus-empty" size={30} color="red" iconStyle={{
          marginRight: 0,
          padding: 0,
        }} borderRadius={0} backgroundColor="red" /></TouchableOpacity>;
        break;
      case 1:
      case 2:
        title = <SegmentedControlIOS values={TABS[index].segments} style={{width: 80 * TABS[index].segments.length}} />
        rightPart = null;
        break;
      case 3:
        title = <Text>设置</Text>;
        rightPart = null;
        break;
    }

    setTimeout(() => {this.props.navigator._navBar && this.props.navigator._navBar.updateUI({title, rightPart});}, 0);
  }

  componentDidMount() {
    var title, leftPart, rightPart;

    switch(this.state.selected) {
      case 0:
        title = <Text style={{fontSize: 18}}>Discovery</Text>;
        leftPart = <View><TouchableOpacity onPress={() => 'toggleForumPicker'}><Text style={{color: COLOR.tint}}>板块</Text></TouchableOpacity></View>;
        rightPart = <View><TouchableOpacity onPress={() => 'newThread'}><Icon name="ios-plus-empty" size={30} color={COLOR.tint} /></TouchableOpacity></View>;
        break;
      case 1:
      case 2:
        title = <SegmentedControlIOS values={TABS[index].segments} style={{width: 80 * TABS[index].segments.length}} />
        rightPart = null;
        break;
      case 3:
        title = <Text>设置</Text>;
        rightPart = null;
        break;
    }

    setTimeout(() => {this.props.navigator._navBar && this.props.navigator._navBar.updateUI({title, leftPart, rightPart});}, 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      showForumPicker: false
    };
  }

  render() {
    console.log('rerere')
    return (
      <YANavigator.Scene
        delegate={this}>
        <TabBarIOS>
          <Icon.TabBarItemIOS
            iconName="ios-chatboxes-outline"
            selectedIconName="ios-chatboxes"
            title={TABS[0].title}
            selected={this.state.selected === 0}
            onPress={() => this.setSelected(0)}>
              <ThreadList showForumPick={this.state.showForumPicker} navigator={this.props.navigator} renderSearch={true} />
            </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS 
            iconName="ios-bell-outline"
            selectedIconName="ios-bell"
            title={TABS[1].title} 
            selected={this.state.selected === 1} 
            onPress={() => this.setSelected(1)} 
            badge="6">
              <Alerts />
            </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS 
            iconName="ios-person-outline" 
            selectedIconName="ios-person"
            title={TABS[2].title} 
            selected={this.state.selected === 2} 
            onPress={() => this.setSelected(2)}>
              <Mines />
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS 
            iconName="ios-gear-outline" 
            selectedIconName="ios-gear"
            title={TABS[3].title} 
            selected={this.state.selected === 3} 
            onPress={() => this.setSelected(3)}>
              <Text />
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      </YANavigator.Scene>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
