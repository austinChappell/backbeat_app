import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, TouchableOpacity, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import io from 'socket.io-client';

import { colors } from '../assets/styles';
import Progress from './common/Progress';
import Api from '../assets/api';
import GeneralAPI from '../assets/APIs/generalAPI';
import MessageAPI from '../assets/APIs/messageAPI';
import Helpers from '../assets/helpers';
import data from '../assets/data';

const { apiURL } = data;
const helpers = new Helpers();
const generalAPI = new GeneralAPI();
const { getAll } = generalAPI;

const api = new Api();
const messageAPI = new MessageAPI();
const { getUserInfo } = api;
const { findUnreadMessages } = helpers;
const { getAllMessages } = messageAPI;

class NavBar extends Component {
  state = {
    onboardingPercent: 0,
    userLoaded: false,
  };

  componentDidMount() {
    console.log('NAVBAR COMPONENT MOUNTED');
    AsyncStorage.getItem('id')
      .then((userid) => {
        this.userid = userid;
      })
      .then(() => {
        AsyncStorage.getItem('auth_token').then((token) => {
          this.token = token;
          // getAllMessages(this.token, this.setMessages)
          this.props.setToken(token);
          getUserInfo(this.userid, token, this.setUser, this.logout);
          getAll('genres', token, this.props.setGenres);
          getAll('instruments', token, this.props.setInstruments);
        });
      });

    this.socket = io(apiURL);

    this.socket.on('RECEIVE_INDIVIDUAL_MESSAGE', (data) => {
      getAllMessages(this.token, this.setMessages);
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  setMessages = (messages) => {
    this.props.setAllMessages(messages);
    const unreadMessages = findUnreadMessages(messages, this.props.user.id);
    this.props.setUnreadMessages(unreadMessages);
  };

  setOnboardingPercent = (user) => {
    const {
      first_name: firstName,
      last_name: lastName,
      avatar,
      instrument_one: instOne,
      instrument_two: instTwo,
      instrument_three: instThree,
      genre_one: genreOne,
      genre_two: genreTwo,
      genre_three: genreThree,
    } = user;
    const hasName = firstName != false && lastName != false;
    const hasAvatar = avatar != false;
    const hasInstrument = instOne !== null || instTwo !== null || instThree !== null;
    const hasGenre = genreOne !== null || genreTwo !== null || genreThree !== null;
    const profileProps = [hasName, hasAvatar, hasInstrument, hasGenre];
    const trueProps = profileProps.filter(item => item);
    const onboardingDecimal = trueProps.length / profileProps.length;
    const onboardingPercent = onboardingDecimal * 100;
    this.setState({ onboardingPercent, userLoaded: true });
  };

  setUser = (user) => {
    this.props.setUser(user);
    this.setOnboardingPercent(user);
  };

  render() {
    const { navigation, unreadMessages, user } = this.props;
    const { onboardingPercent, userLoaded } = this.state;
    const unreadNotification =
      unreadMessages.length > 0 ? (
        <View
          style={{
            position: 'absolute',
            top: -12,
            right: -4,
            zIndex: 10,
          }}
        >
          <Icon size={30} name="dot-single" type="entypo" color="#ff0000" />
        </View>
      ) : null;

    const progressBar =
      onboardingPercent < 100 && userLoaded ? (
        <Progress navigation={navigation} progress={onboardingPercent} />
      ) : null;

    return (
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          backgroundColor={colors.primary}
          leftComponent={
            <TouchableOpacity
              hitSlop={{
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              }}
              onPress={() => navigation.navigate('Settings')}
            >
              <Icon name="ios-settings" type="ionicon" color="#fff" />
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'The BackBeat',
            style: {
              color: '#fff',
            },
          }}
          rightComponent={
            <TouchableOpacity
              hitSlop={{
                top: 20,
                bottom: 20,
                left: 50,
                right: 50,
              }}
              onPress={() => navigation.navigate('Chat')}
            >
              {unreadNotification}
              <Icon name="ios-chatbubbles" type="ionicon" color="#fff" />
            </TouchableOpacity>
          }
        />
        {progressBar}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messages,
  unreadMessages: state.messages.unreadMessages,
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
  setAllMessages: (messages) => {
    const action = { type: 'SET_ALL_MESSAGES', messages };
    dispatch(action);
  },

  setGenres: (genres) => {
    const action = { type: 'SET_GENRES', genres };
    dispatch(action);
  },

  setInstruments: (instruments) => {
    const action = { type: 'SET_INSTRUMENTS', instruments };
    dispatch(action);
  },

  setUser: (user) => {
    const action = { type: 'SET_USER', user };
    dispatch(action);
  },

  setToken: (token) => {
    const action = { type: 'SET_TOKEN', token };
    dispatch(action);
  },

  setUnreadMessages: (messages) => {
    const action = { type: 'SET_UNREAD_MESSAGES', messages };
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
