import React, {
  TextInput,
  StyleSheet,
  Text,
  Component,
  View
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text>uzlee</Text>
        <TextInput placeholder="用户名" style={styles.input} autoFocus/>
        <TextInput placeholder="密码" style={styles.input} secureTextEntry />
        <Text>end</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 32,
    borderColor: 'gray',
    width: 160,
    borderWidth: 1,
    borderRadius: 5
  }
});