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
  PickerIOS,
  PickerItemIOS,
  RecyclerViewBackedScrollView,
  Dimensions,
  ActivityIndicatorIOS,
  RefreshControl,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import PostList from './PostList.js';
import RefreshableListView from './RefreshableListView.js';
import SearchBar from 'react-native-search-bar';
import NavigationBar from 'react-native-navbar';
import User from './User.js';
import {host, COLOR} from './utils/Const.js';
import {formatDay, buildUserImage} from './utils/utils.js';

let FORUMS = require('./assets/hipda.json');
let {width, height} = Dimensions.get('window');

export default class ThreadList extends Component {
  static defaultProps = {
    renderSearch: false
  }

  componentWillReceiveProps(newProps) {
    this.setState({showForumPick: newProps.showForumPick});
  }

  press() {
    this.props.navigator.push({
      title: '主题内容',
      component: PostList,
      navigationBarHidden: false,
      rightButtonIcon: this.state.moreIcon
    });
  }

  userPress() {
    this.props.navigator.push({
      title: '主题内容',
      component: User
    });
  }

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      threads: this.dataSource.cloneWithRows([]),
      selected: "论坛",
      refreshing: false,
      loadingMore: false,
      forum: 2,
      showForumPick: false
    }
    Icon.getImageSource('ios-more', 30, 'blue').then((src) => this.setState({moreIcon: src}));
  }

  fetchData() {
    fetch('http://' + host + '/forum/forumdisplay.php')
    .then((res) => res.json())
    .then((json) => {
      json.threads.forEach((t) => {
        t.dateStr = formatDay(t.dateStr);

        try {
          !t.author.image && (t.author.image = buildUserImage(t.author.id));
        } catch (e) {}
      });

      this.setState({
        threads: this.dataSource.cloneWithRows(json.threads),
        refreshing: false
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  refresh() {
    this.setState({
      threads: this.dataSource.cloneWithRows([]),
      refreshing: true
    });
    this.fetchData();
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          initialListSize={10}
          pageSize={10}
          loadData={() => undefined}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          enableEmptySections
          dataSource={this.state.threads}
          renderRow={(rowData) => 
            <Thread thread={rowData} 
              rootNavigator={this.props.rootNavigator} 
              onItemPress={() => this.press()}
              onUserPress={() => this.userPress()} />
          }
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={{height: 0.5, marginLeft: 8, backgroundColor: '#CCCCCC'}} />}
          renderFooter={() => <ActivityIndicatorIOS animating={this.state.loadingMore} style={{marginTop: 12, marginBottom: 12}}/>}
          renderHeader={() => this.props.renderSearch ? <SearchBar placeholder="搜索" /> : false}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.refresh()}
          />}
        />
        <View style={[this.state.showForumPick ? {paddingBottom: 40} : {height: 0}]}>
        <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
          <Text style={{margin: 20, color: COLOR.tint}} onPress={() => this.setState({showForumPick: false})}>确定</Text>
          <Text style={{margin: 20, color: COLOR.tint}} onPress={() => this.setState({showForumPick: false})}>取消</Text>
        </View>
        <PickerIOS selectedValue={this.state.forum} onValueChange={(forum) => this.setState({forum})}>
          {FORUMS.map((forum) => <PickerIOS.Item key={forum.fid} value={forum.fid} label={forum.name} />)}
        </PickerIOS>
        </View>
      </View>
    );
  }
}


var styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 8
  }
};

class Thread extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      userImageReady: true
    };
  }

  render() {
    var thread = this.props.thread;

    return (
    <TouchableHighlight onPress={() => this.props.onItemPress()} underlayColor={COLOR.touchFeedback}>
      <View key={thread.id} style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.props.onUserPress()}>
          <Image style={[styles.image, {alignItems: 'center', justifyContent: 'center'}]} source={{uri: thread.author.image}}
            onLoad={() => this.setState({userImageReady: true})}
            onError={() => this.setState({userImageReady: false})}>
          <Text style={{fontSize: 24, color: 'gray', textAlign: 'center', opacity: this.state.userImageReady ? 0 : 1}}>{thread.author.name.charAt(0).toUpperCase()}</Text>
          </Image>
        </TouchableWithoutFeedback>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableWithoutFeedback onPress={() => this.props.onUserPress()}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>{thread.author.name}</Text>
                <Text style={{color: 'gray', fontSize: 12, fontWeight: 'normal', marginLeft: 8}}>{thread.dateStr}</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={{fontSize: 12, fontWeight: thread.isNew ? 'bold' : 'normal', color: thread.isNew ? 'red' : 'gray'}}>{thread.commentCount}</Text>
          </View>
          <Text style={{fontSize: 16, marginTop: 6, lineHeight: 20, color: '#353535'}}>{thread.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
    );
  }
}
