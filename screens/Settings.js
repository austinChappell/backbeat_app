import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

import GoBackNavBar from '../components/GoBackNavBar';
import SettingsOptions from './SettingsScreens/';

class Settings extends Component {

  state = {
    selection: null,
  }

  changeSelection = (selection) => {
    this.setState({selection})
  }

  render() {

    const { navigation } = this.props;
    const { selection } = this.state;

    const mainContent = <View style={{ flex: 1, flexDirection: 'column' }}>
      <GoBackNavBar navigation={navigation} logoutButton={true} />
      <View style={{ flexGrow: 1 }}>
        <List>
          <ListItem
            onPress={() => console.log('ACCOUNT SETTINGS CLICKED')}
            title="Account Settings"
          />
          <ListItem
            onPress={() => this.changeSelection('profile')}
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

    const content = selection ? 
    SettingsOptions[selection] : mainContent;

    return content;
  }

} 

export default Settings;
