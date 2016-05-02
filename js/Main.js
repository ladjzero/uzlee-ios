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
import {COLOR, STYLES} from './utils/Const.js';
import Toggle from 'react-native-toggle';

const TABS = [{
  title: '论坛',
  segments: []
}, {
  title: '消息',
  segments: ['短信', '提醒']
}, {
  title: '我的',
  segments: ['主题', '回复', '收藏']
}, {
  title: '设置',
  segments: []
}];

class RightPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };
  }

  render() {
    if (this.state.tab == 0) {
      return (
        <View style={this.state.tab != 0 ? {opacity: 0} : {}}>
          <TouchableOpacity onPress={this.props.onPress}><Icon name="ios-plus-empty" size={30} color={COLOR.tint} /></TouchableOpacity>
        </View>
      );
    } else {
      return <View style={{position: 'absolute'}} />;
    }
  }
}

class LeftPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };
  }

  render() {
    if (this.state.tab == 0) {
      return (
        <View style={this.state.tab != 0 ? {opacity: 0} : {}}>
          <TouchableOpacity onPress={this.props.onPress}><Text style={[STYLES.navBarFont]}>板块</Text></TouchableOpacity>
        </View>
      );
    } else {
      return <View style={{position: 'absolute'}}/>;
    }
  }
}

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      segment_1: 0,
      segment_2: 0
    };
  }

  render() {
    var tab = this.state.tab;

    switch(tab) {
      case 0:
        return <Text style={{fontSize: 18}}>Discovery</Text>;
      case 1:
        return <SegmentedControlIOS values={TABS[tab].segments} style={{width: 140}}
            selectedIndex={this.state.segment_1}
            onChange={(e) => this.setState({segment_1: e.nativeEvent.selectedSegmentIndex})}
            onValueChange={this.props.onValueChange} />;
      case 2:
        return <SegmentedControlIOS values={TABS[tab].segments} style={{width: 140}}
            selectedIndex={this.state.segment_2}
            onChange={(e) => this.setState({segment_2: e.nativeEvent.selectedSegmentIndex})}
            onValueChange={this.props.onValueChange} />;
      case 3:
        return <Text style={{fontSize: 18}}>设置</Text>;
    }
  }
}

export default class Main extends Component {
  static navigationDelegate = {
    id: 'MainPage',
    renderNavBarRightPart(props) {
      return <RightPart onPress={() => 'newThread'}/>;
    },
    renderNavBarLeftPart() {
      return <LeftPart onPress={() => 'toggleForumPicker'}/>;
    },
    renderTitle(props) {
      return <Title onValueChange={() => 'setAlertsSegment'}/>;
    }
  }

  toggleForumPicker() {
    this.setState({showForumPicker: true});
  }
  
  newThread() {
    this.props.navigator.push({component: Edit});
  }

  setAlertsSegment() {
    console.log(arguments)
  }

  setMinesSegment() {

  }

  setSelected(index) {
    this.setState({selected: index});
    this.props.navigator._navBar.refs.leftPart.setState({tab: index});
    this.props.navigator._navBar.refs.rightPart.setState({tab: index});
    this.props.navigator._navBar.refs.title.setState({tab: index});
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      showForumPicker: false,
      alertsSegment: 0,
      minesSegment: 0
    };
  }

  render() {
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
