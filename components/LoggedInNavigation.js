import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { styles, color } from '../assets/styles';
import Icon from 'react-native-vector-icons/Ionicons';

import BandsScreen from './BandsScreen';
import DashboardScreen from './DashboardScreen';
import SettingsScreen from './SettingsScreen';
import MapScreen from './MapScreen';
import NotificationsScreen from './NotificationsScreen';

const LoggedInNavigation = TabNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="ios-settings" size={30} color={tintColor} />
    }
  },
  Bands: {
    screen: BandsScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="ios-musical-notes" size={30} color={tintColor} />
    }
  },
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="ios-stats" size={30} color={tintColor} />
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="ios-map" size={30} color={tintColor} />
    }
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon name="ios-notifications" size={30} color={tintColor} />
    }
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: color.secondary
  }
})

// class LoggedInNavigation extends Component {
//   render() {
//     return (
//       <Tabs />
//     )
//   }
// }

export default LoggedInNavigation;
