import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Icon, List, ListItem } from 'react-native-elements';

import BandEditMember from './BandEditMember';

class BandEditMembers extends Component {
  state = {
    user: null,
  }

  render() {
    const {
      band,
      goBack
    } = this.props;

    const content = this.state.user !== null ? 
      <BandEditMember
        user={this.state.user}
      /> :
      <View>
        <View
          style={{ flexDirection: 'row', paddingLeft: 25, marginTop: 15 }}
        >
          <Icon
            name="ios-arrow-back-outline"
            onPress={goBack}
            type="ionicon"
          />
        </View>
        <Card title={`Editing Members for "${band.name}"`}>
          <List>
            {band.users.map(user => (
              <ListItem
                key={user.id}
                avatar={{ uri: user.avatar }}
                hideChevron
                onPress={() => this.setState({ user })}
                roundAvatar
                title={`${user.first_name} ${user.last_name}`}
              />
            ))}
          </List>
        </Card>
      </View>


    return content;
  };
}

export default BandEditMembers;
