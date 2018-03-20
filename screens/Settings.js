import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Header, Icon, List, ListItem } from 'react-native-elements';

import GoBackNavBar from '../components/GoBackNavBar';
import SettingsOptions from './SettingsScreens/';
import { colors, styles } from '../assets/styles';

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Settings extends Component {
  state = {
    headerTitle: '',
    selection: null,
  };

  changeSelection = (selection, headerTitle) => {
    this.setState({ selection, headerTitle });
  };

  render() {
    const { navigation } = this.props;
    const { selection } = this.state;
    const innerContent = SettingsOptions[selection];
    const selectedContent = (
      <ScrollView>
        <Header
          statusBarProps={{ barStyle: 'dark-content' }}
          backgroundColor={colors.bgLight}
          leftComponent={
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
              onPress={() => this.changeSelection(null, '')}
            >
              <Icon name="ios-arrow-back-outline" type="ionicon" color={colors.primary} />
            </TouchableOpacity>
          }
          centerComponent={{
            text: this.state.headerTitle,
            style: { color: colors.primary },
          }}
        />
        {innerContent}
      </ScrollView>
    );

    const mainContent = (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <GoBackNavBar navigation={navigation} logoutButton={true} />
        <View style={{ flexGrow: 1 }}>
          <List>
            <ListItem
              onPress={() => console.log('ACCOUNT SETTINGS CLICKED')}
              title="Account Settings"
            />
            <ListItem
              onPress={() => this.changeSelection('profile', 'Profile')}
              title="Profile Settings"
            />
            <ListItem
              onPress={() => console.log('NOTIFICATION SETTINGS CLICKED')}
              title="Notification Settings"
            />
          </List>
        </View>
        <View style={{ paddingBottom: 30 }}>
          <Button backgroundColor="red" title="Deactivate Account" />
        </View>
      </View>
    );

    const content = selection ? selectedContent : mainContent;

    return content;
  }
}

Settings.propTypes = propTypes;

export default Settings;
