import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { colors } from './assets/styles';

import Bands from './screens/Bands';
import Chat from './screens/Chat';
import Dashboard from './screens/Dashboard';
import Map from './screens/Map';
import Notifications from './screens/Notifications';
import NotificationSettings from './screens/NotificationSettings';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import SignUp from './screens/SignUp';
import SignInType from './screens/SignInType';
import SignIn from './screens/SignIn';
import SignUpType from './screens/SignUpType';

export const SignedOut = StackNavigator(
  {
    SignInType: {
      screen: SignInType,
      navigationOptions: {
        title: 'Sign In Type'
      }
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: 'Sign In'
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: 'Sign Up'
      }
    },
    SignUpType: {
      screen: SignUpType,
      navigationOptions: {
        title: 'Sign Up Type'
      }
    }
  },
  {
    headerMode: 'none',
  }
)

export const SignedIn = TabNavigator(
  {
    Bands: {
      screen: Bands,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon
          name="ios-musical-notes"
          type="ionicon"
          color={tintColor}
        />
      }
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon
          name="ios-stats"
          type="ionicon"
          color={tintColor}
        />
      }
    },
    Map: {
      screen: Map,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon
          name="ios-compass"
          type="ionicon"
          color={tintColor}
        />
      }
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon
          name="ios-notifications"
          type="ionicon"
          color={tintColor}
        />
      }
    },
  },
  {
    initialRouteName: 'Dashboard',
    tabBarOptions: {
      activeTintColor: colors.primary,
      // showLabel: false
    }
  }
)

const SettingsRoutes = StackNavigator({
  Settings: {
    screen: Settings
  },
  NotificationSettings: {
    screen: NotificationSettings
  },
  Profile: {
    screen: Profile
  },
})

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      Settings: {
        screen: Settings,
        navigationOptions: {
          gesturesEnabled: false,
        }
      },
      Chat: {
        screen: Chat,
        navigationOptions: {
          gesturesEnabled: false,
        }
      }
    },
    {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  )
}
