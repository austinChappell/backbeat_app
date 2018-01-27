import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { View } from 'react-native';

import GoBackNavBar from '../components/GoBackNavBar';
import Api from '../assets/api';

const api = new Api()
const { getProfile } = api;

class Profile extends Component {

  render() {

    console.log('PROPS', this.props)

    const { navigation } = this.props;

    return (
      <View>
        <GoBackNavBar navigation={navigation} logoutButton={true} />
        <Text>
          Hello, {this.props.user.first_name} {this.props.user.last_name}
        </Text>
      </View>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Profile);
