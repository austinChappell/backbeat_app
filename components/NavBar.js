import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, TouchableOpacity, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { colors } from '../assets/styles';
import MessageAPI from '../assets/APIs/messageAPI';
import Helpers from '../assets/helpers';
import io from 'socket.io-client';
import data from '../assets/data';

const { apiURL } = data;
const helpers = new Helpers()
const messageAPI = new MessageAPI();
const { findUnreadMessages } = helpers;
const { getAllMessages } = messageAPI;

class NavBar extends Component {

  componentDidMount() {
    AsyncStorage.getItem('auth_token').then((value) => {
      this.token = value
      // getAllMessages(this.token, this.setMessages)
    })

    this.socket = io(apiURL)

    this.socket.on('RECEIVE_INDIVIDUAL_MESSAGE', (data) => {
      getAllMessages(this.token, this.setMessages)
    })
  }

  componentWillUnmount() {
    this.socket.close()
  }

  setMessages = (messages) => {
    this.props.setAllMessages(messages)
    const unreadMessages = findUnreadMessages(messages, this.props.user.id)
    this.props.setUnreadMessages(unreadMessages)
  }

  render() {

    const { navigation, unreadMessages } = this.props;
    const unreadNotification = unreadMessages.length > 0 ?
      <View style={{ position: 'absolute', top: -12, right: -4, zIndex: 10 }}>
        <Icon
          size={30}
          name="dot-single"
          type="entypo"
          color="#ff0000"
        />
      </View>
      :
      null;

    return (
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor={colors.primary}
        leftComponent={
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon
              name="ios-person"
              type="ionicon"
              color='#fff'
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'The BackBeat',
          style: {
            color: '#fff'
          }
        }}
        rightComponent={
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            onPress={() => navigation.navigate('Chat')}
          >
            {unreadNotification}
            <Icon
              name="ios-chatbubbles"
              type="ionicon"
              color='#fff'
            />
          </TouchableOpacity>
        }
      />
    )

  }
}

const mapStateToProps = (state) => {

  return {

    messages: state.messages.messages,
    unreadMessages: state.messages.unreadMessages,
    user: state.user.user

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    setAllMessages: (messages) => {
      const action = { type: 'SET_ALL_MESSAGES', messages };
      dispatch(action)
    },

    setUnreadMessages: (messages) => {
      const action = { type: 'SET_UNREAD_MESSAGES', messages };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
