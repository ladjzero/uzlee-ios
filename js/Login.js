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

import React, {
  Component, 
  StyleSheet, 
  Text,
  TouchableOpacity,
  View,
  TextInput,
  DeviceEventEmitter,
  PickerIOS,
  PickerItemIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons.js';
import Button from 'apsl-react-native-button';
import Main from './Main.js';
import ThreadList from './ThreadList.js';
import {STYLES} from './utils/Const.js';
import YANavigator from 'react-native-ya-navigator';

const QUESTIONS = require('./assets/questions.json');

export default class Login extends Component{
  static navigationDelegate = {
    renderNavBarLeftPart(props) {
      return <TouchableOpacity><Text style={STYLES.navBarFont}>游客访问</Text></TouchableOpacity>
    },
    renderNavBarRightPart(props) {
      return <TouchableOpacity><Text style={STYLES.navBarFont}>注册</Text></TouchableOpacity>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      keyboardVisible: false,
      name: '',
      password: '',
      question: 0,
      answer: '',
      showQuestions: false,
      logoDeg: '180deg'
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', () => this.setState({keyboardVisible: true}));
    DeviceEventEmitter.addListener('keyboardWillHide', () => this.setState({keyboardVisible: false}));
  }

  componentDidMount() {
    setTimeout(() => this.setState({logoDeg: '360deg'}), 1000);
  }

  login() {
    this.props.navigator.replace({
      component: Main
    });
  }

  render(){
    const bottomBorder = {borderBottomWidth: 0.5, borderColor: 'gray'};
    const topBottomBorder = {borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'gray'};

    return (
      <YANavigator.Scene style={{
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: this.state.showQuestions ? 'space-between' : (this.state.keyboardVisible ? 'flex-start' : 'flex-end')}}>
        <View style={{paddingBottom: 40}}>
          <InputRow ref="name"      label="用户名"   contentStyle={topBottomBorder} autoCapitalize="none" autoCorrect={false} returnKeyType="next"
            onSubmitEditing={() => this.refs.password.refs.input.focus()}
          />
          <InputRow ref="password"  label="密码"     contentStyle={bottomBorder} returnKeyType="next" secureTextEntry
            onSubmitEditing={() => this.refs.question.refs.input.focus()}
          />
          <InputRow ref="question"  label="安全问题"  contentStyle={bottomBorder} value={QUESTIONS[this.state.question]} 
            onFocus={() => {this.refs.question.refs.input.blur(), this.setState({showQuestions: true})}}
          />
          <InputRow ref="answer"    label="答案"     contentStyle={bottomBorder} autoCapitalize="none" autoCorrect={false} returnKeyType="go"
            onFocus={() => this.setState({showQuestions: false})}
            onSubmitEditing={() => this.login()}
          />

        <Button style={{
          backgroundColor: '#007aff', 
          margin: 40, 
          borderWidth: 0
        }} activityIndicatorColor='white' textStyle={{color: 'white'}}
        onPress={() => this.login()}>登入</Button>
        </View>

        <PickerIOS onValueChange={() => null} selectedValue={this.state.question} onValueChange={(question) => this.setState({question})} style={{
          height: this.state.showQuestions ? 300 : 0
        }}>
          {QUESTIONS.map((q, i) => <PickerIOS.Item key={i} value={i} label={q}/>)}
        </PickerIOS>
    </YANavigator.Scene>
    );
  }
}

class KvRow extends Component {

}

class InputRow extends Component {
  static defaultProps = {
    labelWidthRatio: 0.38,
    height: 40,
    labelStyle: {
      fontSize: 18
    }
  }

  render() {
    return (
      <View style={[{flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', height: this.props.height}, this.props.contentStyle]}>
        <Text style={[{flex: this.props.labelWidthRatio}, this.props.labelStyle]}>{this.props.label}</Text>
        <TextInput ref="input" style={{flex: 1 - this.props.labelWidthRatio, textAlign: 'right'}} {...this.props} />
      </View>
    );
  }
}

let styles = {
  thinBorderButton: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  }
}