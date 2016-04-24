import {
  Form,
  InputField,
  Separator, 
  SwitchField, 
  LinkField ,
  PickerField, 
  DatePickerField
} from 'react-native-form-generator';

import React, {Component, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Button from 'apsl-react-native-button';
import Main from './Main.js';
import ThreadList from './ThreadList.js';


export default class Login extends Component{
  static navigationDelegate = {
    renderNavBarLeftPart(props) {
      return <Text>游客访问</Text>
    }
  }

  login() {
    this.props.navigator.replace({
      component: Main
    });
  }

  render(){
      return (<Form
        style={{flex: 1, flexDirection: 'column', paddingTop: 28}}
        ref='registrationForm'>
        <InputField ref='name' label='用户名' containerStyle={styles.thinBorderButton} value="wocao"/>
        <InputField ref='password' label='密码' secureTextEntry containerStyle={styles.thinBorderButton} />
        <PickerField ref='question' placeholder='安全问题'
          options={{
            male: 'Male',
            female: 'Female'
          }} iconRight={<Icon name='ios-arrow-right' size={30} style={{position: 'absolute', right: 10, top: 7, color: '#C7C7CC'}} />} 
          containerStyle={styles.thinBorderButton} />
        <InputField ref='answer' label='答案' containerStyle={styles.thinBorderButton} />
        <Button style={{
          backgroundColor: '#007aff', 
          margin: 40, 
          borderWidth: 0
        }} activityIndicatorColor='white' textStyle={{color: 'white'}}
        onPress={() => this.login()}>登入</Button>
      </Form>);
  }
}

let styles = {
  thinBorderButton: {
    borderBottomWidth: 0.5
  }
}