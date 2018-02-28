import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AsyncStorage, ImagePickerIOS, Picker, View } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { Form, Item, Input, Label } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';

import BasicInfo from './ProfileSections/BasicInfo';
import GeneralAPI from '../../assets/APIs/generalAPI';
import UserAPI from '../../assets/APIs/userAPI';
import { colors } from '../../assets/styles';

const generalAPI = new GeneralAPI();
const userAPI = new UserAPI();

const { update } = generalAPI;
const { uploadAvatar } = userAPI;

console.log('PICKER', Picker);

const propTypes = {
  genres: PropTypes.array.isRequired,
  instruments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

class Profile extends Component {
  state = {
    avatar: 'empty-string',
    bio: '',
    email: '',
    firstName: '',
    lastName: '',
    genres: [1, 2, 3],
    instruments: [1, 2, 3],
    notificationEmail: '',
    zipCode: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  setInitialImage = () => {
    this.setState({
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    });
  };

  handleInputChange = (val, key) => {
    clearTimeout(this.stopUpdate);
    const o = {};
    o[key] = val;
    this.setState(o, () => {
      this.stopUpdate = setTimeout(() => {
        this.updateUser();
      }, 1000);
    });
  };

  handlePickerChange = (val, index, key, stateItemIndex) => {
    clearTimeout(this.stopUpdate);
    const options = this.state[key];
    options[stateItemIndex] = val;
    const o = {};
    o[key] = options;
    this.setState(o, () => {
      this.stopUpdate = setTimeout(() => {
        this.updateUser();
      }, 1000);
    });
  };

  loadUser = () => {
    const { user } = this.props;
    const {
      avatar,
      bio,
      email,
      first_name: firstName,
      last_name: lastName,
      notification_email: notificationEmail,
      zip_code: zipCode,
      instrument_one: instOne,
      instrument_two: instTwo,
      instrument_three: instThree,
      genre_one: genreOne,
      genre_two: genreTwo,
      genre_three: genreThree,
    } = user;
    this.setState({
      avatar,
      bio,
      email,
      firstName,
      lastName,
      notificationEmail,
      zipCode,
      instruments: [instOne, instTwo, instThree],
      genres: [genreOne, genreTwo, genreThree],
    });
  };

  pickImage = () => {
    // ImagePickerIOS.openSelectDialog(
    //   {},
    //   (avatar) => {
    //     console.log('avatar', avatar)
    //     // this.setState({ avatar });
    //   },
    //   err => console.error(err),
    // );
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      writeTempFile: false,
      includeBase64: true,
    }).then((avatar) => {
      const { user, token } = this.props;
      const body = {
        image: avatar.data,
        userId: user.id,
      };
      uploadAvatar(body, token, this.updateAvatar);
      // this.setState({ avatar });
    });
  };

  updateAvatar = (results) => {
    const { avatar } = results.rows[0];
    const { user } = this.props;
    user.avatar = avatar;
    this.setState({ avatar });
  };

  updateResponse = (results) => {
    const user = results[0];
    Snackbar.show({
      title: 'Changes Saved',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.primary,
    });
    this.props.setUser(user);
  };

  updateUser = () => {
    const {
      firstName, lastName, notificationEmail, zipCode, genres, instruments, bio,
    } = this.state;
    const user = {
      firstName,
      lastName,
      notificationEmail,
      zipCode,
      bio,
      instOne: instruments[0],
      instTwo: instruments[1],
      instThree: instruments[2],
      genreOne: genres[0],
      genreTwo: genres[1],
      genreThree: genres[2],
    };
    if (this.validUser()) {
      AsyncStorage.getItem('auth_token').then((token) => {
        update('users', token, user, this.updateResponse);
      });
    }
  };

  validUser = () => {
    let valid = true;
    let message;
    const {
      firstName, lastName, notificationEmail, zipCode,
    } = this.state;
    if (firstName.trim().length < 3 || lastName.trim().length < 3) {
      valid = false;
      message = 'Use at least three letters.';
    } else if (notificationEmail && (notificationEmail.indexOf('@') < 1 || notificationEmail.indexOf('.') < 3)) {
      valid = false;
      message = 'Invalid email';
    } else if (zipCode.length !== 5 || !Number.isInteger(Number(zipCode))) {
      valid = false;
      message = 'Invalid zip code';
    }
    if (!valid) {
      Snackbar.show({
        title: message,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.failure,
      });
    }
    return valid;
  };

  render() {
    console.log('PROFILE STATE', this.state);
    const {
      firstName, lastName, notificationEmail, email, zipCode,
    } = this.state;

    return (
      <View contentContainerStyle={{ flex: 0 }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Avatar
            large
            rounded
            source={{ uri: this.state.avatar }}
            onPress={this.pickImage}
            activeOpacity={0.7}
          />
        </View>
        <BasicInfo
          email={email}
          firstName={firstName}
          handleInputChange={this.handleInputChange}
          lastName={lastName}
          notificationEmail={notificationEmail}
          zipCode={zipCode}
        />
        <View>
          <Card title="Bio">
            <View>
              <Input
                autoGrow
                maxLength={500}
                multiline
                numberOfLines={8}
                onChangeText={text => this.handleInputChange(text, 'bio')}
                value={this.state.bio}
              />
            </View>
          </Card>
        </View>
        <View>
          <Card title="Genres of Interest">
            <Form>
              {this.state.genres.map((stateGenre, sgIndex) => (
                <View key={sgIndex}>
                  <Label> Genre# {sgIndex + 1}</Label>
                  <Picker
                    selectedValue={this.state.genres[sgIndex]}
                    style={{
                      marginTop: 0,
                    }}
                    onValueChange={(val, index) =>
                      this.handlePickerChange(val, index, 'genres', sgIndex)
                    }
                  >
                    <Picker.Item label="---" value={null} />
                    {this.props.genres.map((genre, index) => {
                      const selectionIndex = this.state.genres.findIndex(option => option === genre.id);
                      if (selectionIndex < 0 || selectionIndex === sgIndex) {
                        return <Picker.Item key={index} label={genre.label} value={genre.id} />;
                      }
                    })}
                  </Picker>
                </View>
              ))}
            </Form>
          </Card>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Card title="Instruments">
            <Form>
              {this.state.instruments.map((stateInstrument, instIndex) => (
                <View key={instIndex}>
                  <Label> Instrument# {instIndex + 1}</Label>
                  <Picker
                    selectedValue={stateInstrument}
                    onValueChange={(val, index) =>
                      this.handlePickerChange(val, index, 'instruments', instIndex)
                    }
                  >
                    <Picker.Item label="---" value={null} />
                    {this.props.instruments.map((instrument, index) => {
                      const selectionIndex = this.state.instruments.findIndex(option => option === instrument.id);
                      if (selectionIndex < 0 || selectionIndex === instIndex) {
                        return (
                          <Picker.Item key={index} label={instrument.label} value={instrument.id} />
                        );
                      }
                    })}
                  </Picker>
                </View>
              ))}
            </Form>
          </Card>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genresReducer.genres,
  instruments: state.instrumentsReducer.instruments,
  token: state.userReducer.token,
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    const action = {
      type: 'SET_USER',
      user,
    };
    dispatch(action);
  },
});

Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
