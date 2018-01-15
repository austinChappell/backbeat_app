import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { styles, color } from '../assets/styles';

import BandsScreen from './BandsScreen';
import DashboardScreen from './DashboardScreen';
import SettingsScreen from './SettingsScreen';
import MapScreen from './MapScreen';
import NotificationsScreen from './NotificationsScreen';

const LoggedInNavigation = TabNavigator({
  Settings: { screen: SettingsScreen },
  BandsScreen: { screen: BandsScreen },
  Dashboard: { screen: DashboardScreen },
  Map: { screen: MapScreen },
  Notifications: { screen: NotificationsScreen }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: color.primary
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
