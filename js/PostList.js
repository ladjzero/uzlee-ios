import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  ListView,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      threads: this.dataSource.cloneWithRows([]),
      selected: "论坛"
    }
  }

  componentWillMount() {
    fetch('http://192.168.0.107:7788/forum/forumdisplay.php')
    .then((res) => res.json())
    .then((json) => {
      this.setState({threads: this.dataSource.cloneWithRows(json.threads)});
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          style={{paddingLeft: 8}}
          enableEmptySections
          dataSource={this.state.threads}
          renderRow={(rowData) => 
            <Post thread={rowData}></Post>
          }
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={{height: 1, backgroundColor: '#CCCCCC'}} />}
        />
      </View>
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
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 8
  }
};

class Post extends Component {
  render() {
    var thread = this.props.thread;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: 'https://lh3.googleusercontent.com/-we7OfZGjIfg/AAAAAAAAAAI/AAAAAAAAAAA/ADhl2yoLaz97ZsHkMI-m6fcSEBJ3-RYViA/s32-c-mo/photo.jpg'}}></Image>
        <View style={{
          flex: 1,
          flexDirection: 'column'
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text style={{fontWeight: 'bold'}}>{thread.author.name}
              <Text style={{color: 'gray', fontSize: 12, fontWeight: 'normal'}}>{thread.dateStr}</Text>
            </Text>
            <Text>{thread.commentCount}</Text>
          </View>
          <Text numberOfLines={2} style={{
            fontSize: 16
          }}>{thread.title}</Text>
        </View>
      </View>
    );
  }
}
