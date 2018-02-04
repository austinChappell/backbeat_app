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
    messageHistory: [],
    userMessages: []
  }

  componentDidMount() {
    console.log('CHAT SCREEN MOUNTED')
    AsyncStorage.getItem('auth_token').then((value) => {
      this.token = value
      getAllMessages(this.token, this.setMessages)
    })
  }

  clearRecipient = () => {
    this.setState({ currentRecipientId: null , userMessages: [] })
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
        messageHistory.push(message)

      }

    })

    console.log('MESSAGE HISTORY', messageHistory)

    this.setState({ messageHistory })

  }

  loadMessages = (tag) => {
    console.log('TAG', tag)
    this.setState({ currentRecipientId: tag }, () => {
      const { currentRecipientId } = this.state;
      const { token, setUserMessages } = this;
      getUserMessages(currentRecipientId, token, setUserMessages)
    })
  }

  setMessages = (messages) => {
    console.log('ALL MESSAGES', messages)
    this.props.setAllMessages(messages)
    this.getMessageHistory()
  }

  setUserMessages = (userMessages) => {
    this.setState({ userMessages })
  }

  render() {

    console.log('CHAT STATE', this.state)
    const { navigation } = this.props;

    const displayContent = this.state.currentRecipientId
    ?
    <Message
      goBack={this.clearRecipient}
      messages={this.state.userMessages}
    />
    :
    <ScrollView>
      <GoBackNavBar navigation={navigation} logoutButton={false} />
      <List>
        {this.state.messageHistory.map((message, index) => {
          const { content, displayName, tag } = message;
          const date = new Date(message.created_at).toDateString();
          const today = new Date().toDateString();
          const displayDate = date === today ? 'Today' : date;
          return (
            <ListItem
              key={index}
              onPress={() => this.loadMessages(tag)}
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
