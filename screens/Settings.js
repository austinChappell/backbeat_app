import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

import GoBackNavBar from '../components/GoBackNavBar';

class Settings extends Component {

  render() {

    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <GoBackNavBar navigation={navigation} logoutButton={true} />
        <View style={{ flexGrow: 1 }}>
          <List>
            <ListItem
              onPress={() => console.log('ACCOUNT SETTINGS CLICKED')}
              title="Account Settings"
            />
            <ListItem
              onPress={() => console.log('PROFILE SETTINGS CLICKED')}
              title="Profile Settings"
            />
            <ListItem
              onPress={() => console.log('NOTIFICATION SETTINGS CLICKED')}
              title="Notification Settings"
            />
          </List>
        </View>
        <View style={{ paddingBottom: 30 }}>
          <Button
            backgroundColor="red"
            title="Deactivate Account"
          />
        </View>
      </View>
    )
  }

} 

export default Settings;
