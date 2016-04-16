import React, {
  AppRegistry,
  Component,
  Navigator
} from 'react-native';

import Main from './js/Main.js';

class izlee extends Component {
  render() {
    return (
      <Navigator renderScene={() => <Main></Main>}></Navigator>
    );
  }
}

AppRegistry.registerComponent('izlee', () => izlee);
