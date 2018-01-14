/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store/';

import DashboardScreen from './components/DashboardScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsScreen from './components/SettingsScreen';
import SignupScreen from './components/SignupScreen';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const Stack = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  Dashboard: { screen: DashboardScreen }
})

const Tabs = TabNavigator({
  Settings: { screen: SettingsScreen },
  Dashboard: { screen: DashboardScreen }
})

// const App = StackNavigator({
//   Home: { screen: HomeScreen },
//   Profile: { screen: ProfileScreen }
// })

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    )
  }
}

// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

export default App;
