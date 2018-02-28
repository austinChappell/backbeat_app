import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import io from 'socket.io-client';

import GoBackNavBar from '../components/GoBackNavBar';
import Helpers from '../assets/helpers';
import MemberSearch from '../components/MemberSearch';
import Message from './Message';
import MessageAPI from '../assets/APIs/messageAPI';
import data from '../assets/data';

const { apiURL } = data;
const helpers = new Helpers();
const messageAPI = new MessageAPI();
const { findUnreadMessages } = helpers;
const { getAllMessages } = messageAPI;

class Chat extends Component {
  state = {
    currentRecipientId: null,
    currentRecipientName: null,
    messageHistory: [],
    userMessages: [],
  };

  componentDidMount() {
    AsyncStorage.getItem('auth_token').then((value) => {
      this.token = value;
    });
    this.getMessageHistory();

    this.socket = io(apiURL);

    this.socket.on('RECEIVE_INDIVIDUAL_MESSAGE', (data) => {
      this.reloadMessages();
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  clearRecipient = () => {
    this.setState({ currentRecipientId: null, currentRecipientName: null, userMessages: [] }, () =>
      this.reloadMessages());
  };

  getMessageHistory = () => {
    const { messages, user } = this.props;
    const senderIds = [];
    const messageHistory = [];

    messages.forEach((message) => {
      const {
        recipient_id, recipient_name, sender_id, sender_name,
      } = message;
      // THIS HAS TO BE DOUBLE EQUALS
      const id = sender_id == user.id ? recipient_id : sender_id;

      if (!senderIds.includes(id)) {
        senderIds.push(id);

        // THIS HAS TO BE DOUBLE EQUALS
        const displayName = sender_id == user.id ? recipient_name : sender_name;
        message.displayName = displayName;
        message.tag = id;
        const { unreadMessages } = this.props;
        const unread = unreadMessages.find(msg => msg.sender_id === id);
        if (unread) {
          message.unread = true;
        }
        messageHistory.push(message);
      }
      console.log('SENDER IDS', senderIds);
    });

    this.setState({ messageHistory });
  };

  loadMessages = (tag, currentRecipientName) => {
    console.log('LOADING MESSAGES');
    const { messages } = this.props;
    const userMessages = messages.filter(message => message.sender_id === tag || message.recipient_id === tag);
    this.setState({ currentRecipientId: tag, currentRecipientName, userMessages });
  };

  reloadMessages = () => {
    getAllMessages(this.token, this.setMessages);
  };

  setMessages = (messages) => {
    this.props.setAllMessages(messages);
    const unreadMessages = findUnreadMessages(messages, this.props.user.id);
    this.props.setUnreadMessages(unreadMessages);
    this.getMessageHistory();
  };

  render() {
    console.log('USER INFO FROM CHAT COMPONENT', this.props.user);

    const { navigation } = this.props;
    console.log('CHAT STATE', this.state);

    const displayContent = this.state.currentRecipientId ? (
      // PROBABLY REFACTOR THIS SO THE MESSAGES PROP GETS FILTERED ON THE WAY IN INSTEAD OF FILTERING ON LIST ITEM CLICK. THIS WAY WE CAN MORE EASILY HAVE REAL-TIME MESSAGE UPDATE FROM THE MESSAGE VIEW
      <Message
        currentRecipientId={this.state.currentRecipientId}
        currentRecipientName={this.state.currentRecipientName}
        goBack={this.clearRecipient}
        messages={this.state.userMessages}
        token={this.token}
      />
    ) : (
      <ScrollView>
        <GoBackNavBar navigation={navigation} logoutButton={false} />
        <MemberSearch loadMessages={this.loadMessages} token={this.props.token} />
        <List>
          {this.state.messageHistory.map((message, index) => {
            const leftIcon = message.unread
              ? {
                  size: 20,
                  name: 'dot-single',
                  type: 'entypo',
                  color: '#ff0000',
                }
              : null;

            const { content, displayName, tag } = message;
            const date = new Date(message.created_at).toDateString();
            const today = new Date().toDateString();
            const displayDate = date === today ? 'Today' : date;
            return (
              <ListItem
                key={index}
                leftIcon={leftIcon}
                onPress={() => this.loadMessages(tag, displayName)}
                rightTitle={displayDate}
                subtitle={content}
                title={displayName}
              />
            );
          })}
        </List>
      </ScrollView>
    );

    return displayContent;
  }
}

const mapStateToProps = state => ({
  token: state.userReducer.token,
  messages: state.messages.messages,
  unreadMessages: state.messages.unreadMessages,
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
  setAllMessages: (messages) => {
    const action = { type: 'SET_ALL_MESSAGES', messages };
    dispatch(action);
  },

  setUnreadMessages: (messages) => {
    const action = { type: 'SET_UNREAD_MESSAGES', messages };
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
