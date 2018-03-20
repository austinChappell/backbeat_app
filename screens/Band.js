import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';

import GeneralAPI from '../assets/APIs/generalAPI';

const generalAPI = new GeneralAPI();

const { getOne } = generalAPI;

const propTypes = {
  bandId: PropTypes.number.isRequired,
  goBack: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Band extends Component {
  state = {
    band: {},
  };

  componentWillMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.setBand({});
  }

  getBandRes = band => {
    this.setBand(band);
  };

  getData = () => {
    getOne('bands', this.props.bandId, this.props.token, this.getBandRes);
  };

  setBand = band => {
    this.setState({ band });
  };

  render() {
    const { band } = this.state;
    const { admin, description, genre, name, skill_level: skillLevel, users } = band;
    const isAdmin = admin ? admin.id === this.props.user.id : false;
    const genreLabel = genre ? genre.label : '';
    const skillLabel = skillLevel ? skillLevel.label : '';
    const userInfo = users
      ? band.users.map((user, index) => {
          const { first_name: firstName, last_name: lastName, avatar } = user;
          return (
            <View key={index}>
              <Text>{`${firstName} ${lastName}`}</Text>
              <Avatar medium rounded source={{ uri: avatar }} />
            </View>
          );
        })
      : null;

    const editButton = isAdmin ? (
      <View>
        <Button title="Edit Band" onPress={this.props.goBack} />
      </View>
    ) : null;

    return (
      <View>
        <View>
          <Icon name="ios-arrow-back-outline" type="ionicon" onPress={this.props.goBack} />
        </View>
        <View>
          <Text>{name}</Text>
        </View>
        <View>
          <Text>{description}</Text>
        </View>
        <View>
          <Text>{genreLabel}</Text>
        </View>
        <View>
          <Text>{skillLabel}</Text>
        </View>
        <View>{userInfo}</View>
        {editButton}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

Band.propTypes = propTypes;

export default connect(mapStateToProps)(Band);
