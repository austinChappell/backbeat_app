import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native';

import GoBackNavBar from '../components/GoBackNavBar';
import Message from './Message';
import MessageAPI from '../assets/APIs/messageAPI';

const messageAPI = new MessageAPI();

const { getAllMessages, getUserMessages } = messageAPI;

class Chat extends Component {

  state = {
    currentRecipientId: null,
    currentRecipientName: null,
    messageHistory: [],
    userMessages: []
  }

  componentDidMount() {
    console.log('CHAT SCREEN MOUNTED')
    AsyncStorage.getItem('auth_token').then((value) => {
      this.token = value
      console.log('TOKEN', this.token)
      getAllMessages(this.token, this.setMessages)
    })
  }

  clearRecipient = () => {
    this.setState({ currentRecipientId: null, currentRecipientName: null, userMessages: [] })
  }

  getMessageHistory = () => {

    const { messages, user } = this.props;
    const senderIds = []
    const messageHistory = []

    messages.forEach(message => {
      const { recipient_id, recipient_name, sender_id, sender_name } = message;
      const id = sender_id === user.id ? recipient_id : sender_id;

      if (!senderIds.includes(id)) {
        senderIds.push(id)

        const displayName = sender_id === user.id ? recipient_name : sender_name;
        message.displayName = displayName;
        message.tag = id;
        const { unreadMessages } = this.props;
        const unread = unreadMessages.find(msg => msg.sender_id === id);
        if (unread) {
          message.unread = true;
        }
        messageHistory.push(message)

      }

    })

    console.log('MESSAGE HISTORY', messageHistory)

    this.setState({ messageHistory })

  }

  loadMessages = (tag, currentRecipientName) => {
    console.log('TAG', tag)
    const { messages } = this.props;
    const userMessages = messages.filter(message => {
      return message.sender_id === tag || message.recipient_id === tag
    })
    this.setState({ currentRecipientId: tag, currentRecipientName, userMessages })
  }

  setMessages = (messages) => {
    console.log('ALL MESSAGES', messages)
    this.props.setAllMessages(messages)
    this.getMessageHistory()
  }

  render() {

    console.log('CHAT STATE', this.state)
    const { navigation } = this.props;

    const displayContent = this.state.currentRecipientId
    ?
    <Message
      currentRecipientId={this.state.currentRecipientId}
      currentRecipientName={this.state.currentRecipientName}
      goBack={this.clearRecipient}
      messages={this.state.userMessages}
      token={this.token}
    />
    :
    <ScrollView>
      <GoBackNavBar navigation={navigation} logoutButton={false} />
      <List>
        {this.state.messageHistory.map((message, index) => {
          const leftIcon = message.unread ? 
          { size: 20, name: 'dot-single', type: 'entypo', color: '#ff0000' }
          :
          null;

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
          )
        })}
      </List>

    </ScrollView>

    return (
      displayContent
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
