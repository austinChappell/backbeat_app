import { StackNavigator, TabNavigator } from 'react-navigation';

import Bands from './screens/Bands';
import Chat from './screens/Chat';
import Dashboard from './screens/Dashboard';
import Map from './screens/Map';
import Notifications from './screens/Notifications';
import Profile from './screens/Profile';
import Settings from './screens/Settings';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up'
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In'
    }
  }
})

export const SignedIn = TabNavigator(
  {
    Settings: {
      screen: Settings,
    },
    Bands: {
      screen: Bands
    },
    Dashboard: {
      screen: Dashboard,
    },
    Map: {
      screen: Map,
    },
    Notifications: {
      screen: Notifications,
    },
  },
  {
    initialRouteName: 'Dashboard'
  }
)

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
      Profile: {
        screen: Profile,
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
