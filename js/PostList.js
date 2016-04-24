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
  RecyclerViewBackedScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import HTMLView from 'react-native-htmlview';
import ImageProgress from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import RefreshInfiniteListView from '@remobile/react-native-refresh-infinite-listview';
import {host} from './utils/Const.js';
import YANavigator from 'react-native-ya-navigator';


export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      posts: this.dataSource.cloneWithRows([]),
      selected: "论坛"
    }
  }

  componentWillMount() {
    fetch('http://' + host + '/forum/viewthread.php')
    .then((res) => res.json())
    .then((json) => {
      this.setState({posts: this.dataSource.cloneWithRows(json.posts)});
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    return (
      <YANavigator.Scene style={{flex: 1}}>
        <ListView
          initialListSize={10}
          pageSize={10}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          enableEmptySections
          dataSource={this.state.posts}
          renderRow={(rowData) => 
            <Post post={rowData}></Post>
          }
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={{height: 0.5, backgroundColor: '#CCCCCC'}} />}
        />
      </YANavigator.Scene>
    );
  }
}


var styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 8
  }
};

class Post extends Component {
  imageLoad() {
    console.log();
  }

  renderHtmlNode(node, index) {
    // if (node.name == 'img') {
    //   var {width, height} = Dimensions.get('window');

    //   return (
    //     <ImageProgress key={index} indicator={ProgressBar} source={{uri: node.attribs.src}} style={{width, height}} />
    //   );
    // }
  }

  render() {
    var post = this.props.post;

    return (
      <View key={post.id} style={{flex: 1, flexDirection: 'column', paddingRight: 8, paddingTop: 8, paddingBottom: 8}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Image style={styles.image} source={{uri: 'http://tp2.sinaimg.cn/1236886101/180/40074117324/1'}}></Image>
          <Text style={{fontWeight: 'bold', flex: 1}}>{post.author.name}
            <Text style={{color: 'gray', fontSize: 12, fontWeight: 'normal'}}>{post.timeStr}</Text>
          </Text>
          <Text>#{post.postIndex}</Text>
        </View>
        <HTMLView renderNode={(node, index) => this.renderHtmlNode(node, index)} value={post.body} />
      </View>
    );
  }
}
