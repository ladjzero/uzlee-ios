import {
  Form,
  InputField,
  Separator, 
  SwitchField, 
  LinkField ,
  PickerField, 
  DatePickerField
} from 'react-native-form-generator';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  ListView,
  View,
  Image,
  Dimensions,
  RecyclerViewBackedScrollView,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import HTMLView from 'react-native-htmlview';
import ImageProgress from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import RefreshInfiniteListView from '@remobile/react-native-refresh-infinite-listview';
import {host} from './utils/Const.js';
import YANavigator from 'react-native-ya-navigator';
import Button from 'apsl-react-native-button';
import ThreadList from './ThreadList.js';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state= {};
  }

  componentWillMount() {
    fetch('http://' + host + '/forum/space.php')
    .then((res) => res.json())
    .then((json) => {
      this.setState(json.user);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render(){
      return (
      <YANavigator.Scene><View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16}}>
          <Image source={{uri: this.state.image}} style={{width: 80, height: 80}} resizeMode="contain" />
          <View style={{marginLeft: 12}}>
            <Text style={styles.margin}>{this.state.name}</Text>
            <Text style={styles.margin}>{this.state.level}</Text>
            <Text style={styles.margin}>No.{this.state.id}</Text>
          </View>
        </View>
        <View style={{borderTopWidth: 0.5, borderColor: 'gray'}}>
          <TouchableHighlight underlayColor="gray" onPress={() => this.props.navigator.push({component: ThreadList})}>
          <View style={styles.row}>
            <Text style={styles.fontSize16}>发帖数量</Text>
            <Text style={styles.fontSize16}>{this.state.totalThreads}</Text>
            <Icon name='ios-arrow-right' size={30} style={{position: 'absolute', right: 10, top: 7, color: '#C7C7CC'}} />
          </View>
          </TouchableHighlight>
          <View style={styles.row}>
            <Text style={styles.fontSize16}>积分</Text>
            <Text style={styles.fontSize16}>{this.state.points}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.fontSize16}>注册日期</Text>
            <Text style={styles.fontSize16}>{this.state.registerDateStr}</Text>
          </View>
        </View>
        <Button style={{
          backgroundColor: 'green', 
          margin: 40, 
          borderWidth: 0
        }} activityIndicatorColor='white' textStyle={{color: 'white'}}
        onPress={() => this.login()}>短信</Button>
      </View></YANavigator.Scene>);
  }
}


let styles = {
  row: {
    flex: 1, flexDirection: 'row', justifyContent: 'space-between',
    padding: 12,
    paddingLeft: 16,
    paddingRight: 24,
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  margin: {
    margin: 4,
    color: 'gray'
  },
  fontSize16: {
    fontSize: 16
  }
}
