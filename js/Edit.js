import {
  Form,
  InputField,
  Separator, 
  SwitchField, 
  LinkField ,
  PickerField, 
  DatePickerField,
  KeyboardAwareScrollView
} from 'react-native-form-generator';

import React, {Component, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Button from 'apsl-react-native-button';
import Main from './Main.js';
import ThreadList from './ThreadList.js';
import YANavigator from 'react-native-ya-navigator';

var ImagePickerManager = require('NativeModules').ImagePickerManager;


export default class Login extends Component{
  static navigationDelegate = {
    id: 'EditPage',
    renderNavBarRightPart(props) {
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>表情</Text>
          <Text onPress={() => 'pickImage'}>图像</Text>
          <Text>发送</Text>
        </View>
      );
    }
  }

  pickImage() {
var options = {
  title: null, // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  quality: 0.2, // 0 to 1, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

/**
* The first arg will be the options object for customization, the second is
* your callback which sends object: response.
*
* See the README for info about the response
*/

ImagePickerManager.launchImageLibrary(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePickerManager Error: ', response.error);
  }
  else {
    const source = {uri: response.uri.replace('file://', ''), isStatic: true};

    this.setState({
      avatarSource: source
    });
  }
});
  }

  login() {
    this.props.navigator.replace({
      component: Main
    });
  }

  render(){
      return (
      <YANavigator.Scene
        delegate={this}>
        <KeyboardAwareScrollView>
        <Form
        style={{flex: 1, flexDirection: 'column'}}
        ref='registrationForm'>
        <PickerField ref='question' placeholder='版块'
          options={{
            male: 'Male',
            female: 'Female'
          }} iconRight={<Icon name='ios-arrow-down' size={30} style={{position: 'absolute', right: 10, top: 7, color: '#C7C7CC'}} />} 
          containerStyle={styles.thinBorderButton} />
        <InputField ref='name' label='标题' containerStyle={styles.thinBorderButton} />
        <InputField multiline ref='password' label='内容' secureTextEntry containerStyle={styles.thinBorderButton} />
      </Form>
      </KeyboardAwareScrollView>
    </YANavigator.Scene>);
  }
}

let styles = {
  thinBorderButton: {
    borderBottomWidth: 0.5
  }
}