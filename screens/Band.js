import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { Avatar, Button, Card, Icon } from 'react-native-elements';

import BandEdit from './BandEdit';

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
    isEditing: false,
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

  toggleEdit = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing }, () => {
      if (!this.state.isEditing) {
        this.props.updateParent();
      }
    })
  }

  render() {
    const { 
      band,
      isEditing
    } = this.state;
    const {
      admin,
      description,
      genre,
      name,
      skill_level: skillLevel,
      users
    } = band;
    const isAdmin = admin ? admin.id === this.props.user.id : false;
    const genreLabel = genre ? genre.label : '';
    const skillLabel = skillLevel ? skillLevel.label : '';
    const userInfo = users
      ? band.users.map((user, index) => {
          const { first_name: firstName, last_name: lastName, avatar } = user;
          return (
            <View key={index} style={{ marginRight: 10 }}>
              <Text style={{ textAlign: 'center' }}>{firstName}</Text>
              <Text style={{ textAlign: 'center' }}>{lastName}</Text>
              <Avatar medium rounded source={{ uri: avatar }} />
            </View>
          );
        })
      : null;

    const editButton = isAdmin ? (
      <View>
        <Button
          title="Edit Band"
          onPress={this.toggleEdit}
        />
      </View>
    ) : null;

    const content = isEditing ? (
      <BandEdit
        band={this.state.band}
        goBack={this.toggleEdit}
        updateParent={this.getData}
      />
    ) : (
      <View>
        <View style={{ flexDirection: 'row', paddingLeft: 25, marginTop: 15 }}>
          <Icon
            name="ios-arrow-back-outline"
            onPress={this.props.goBack}
            type="ionicon"
          />
        </View>
        <Card title={name}>
          <View>
            <Text>{description}</Text>
          </View>
          <View>
            <Text>{genreLabel}</Text>
          </View>
          <View>
            <Text>{skillLabel}</Text>
          </View>
          <ScrollView horizontal>{userInfo}</ScrollView>
          {editButton}
        </Card>
      </View>
    );

    return content;
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

Band.propTypes = propTypes;

export default connect(mapStateToProps)(Band);
