import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, FormInput, Header, Icon } from 'react-native-elements';
import io from 'socket.io-client';
import { colors, styles } from '../assets/styles';
import GeneralAPI from '../assets/APIs/generalAPI';
import MessageAPI from '../assets/APIs/messageAPI';
import data from '../assets/data';

const { apiURL } = data;
const generalAPI = new GeneralAPI();
const messageAPI = new MessageAPI();
const { getUserPhoto } = generalAPI;
const { markAsRead, sendMessage } = messageAPI;

class Message extends Component {

  constructor() {
    super()

    this.state = {
      isTyping: false,
      loaded: false,
      message: '',
      numOfMessages: 20,
      profileImage: 'http://res.cloudinary.com/dsjyqaulz/image/upload/v1509814626/profile_image_placeholder_kn7eon.png',
      userTyping: null,
    }

    this.socket = io(apiURL)

    this.socket.on('RECEIVE_INDIVIDUAL_MESSAGE', (data) => {
      this.addMessage(data[0])
    })

    this.socket.on('NOTIFY_TYPING', (user) => {
      if (user.id !== this.props.user.id) {
        this.setUserTyping(user)
      }
    })

    this.socket.on('REMOVE_TYPING_USER', (user) => {
      if (user.id !== this.props.user.id) {
        this.clearUserTyping()
      }
    })

  }

  componentDidMount() {
    this.user = {}
    AsyncStorage.getItem('firstName').then(firstName => this.user.firstName = firstName)
    AsyncStorage.getItem('lastName').then(lastName => this.user.lastName = lastName)
    this.fetchPhoto()
  }

  componentWillUnmount() {
    this.socket.close()
  }

  addMessage = (message) => {
    this.props.messages.unshift(message)
    this.setState({ message: '' }, () => {
      setTimeout(() => {
        this.scrollView.scrollToEnd()
      }, 0)
    })
  }

  clearUserTyping = () => {
    this.setState({ userTyping: null }, () => this.scrollDown(true))
  }

  fetchPhoto = () => {
    const { currentRecipientId, token } = this.props;
    getUserPhoto(currentRecipientId, token, this.setPhoto)
  }

  handleMessageChange = (message) => {
    clearTimeout(this.stopTyping)
    if (!this.state.isTyping) {
      this.socket.emit('MESSAGE_TYPING', this.props.user)
    }
    this.setState({ message, isTyping: true }, () => {
      this.stopTyping = setTimeout(() => {
        this.socket.emit('STOP_TYPING', this.props.user)
        this.setState({ isTyping: false })
      }, 2000)
    })
  }

  handleSizeChange = (width, height) => {
    if (!this.state.loaded) {
      this.scrollDown(false)
      this.setState({ loaded: true })
    }
  }

  readMessage = (results) => {
    console.log('MARK AS READ RESULTS INSIDE MESSAGE PAGE', results)
  }

  scrollDown = (animated) => {
    setTimeout(() => {
      this.scrollView.scrollToEnd({ animated })
    }, 0)
  }

  setPhoto = (data) => {
    const profileImage = data.profile_image_url 
    ? 
    data.profile_image_url 
    :
    'http://res.cloudinary.com/dsjyqaulz/image/upload/v1509814626/profile_image_placeholder_kn7eon.png'

    this.setState({ profileImage })
  }

  setUserTyping = (user) => {
    this.setState({ userTyping: user.first_name }, this.scrollDown(true))
  }

  submit = () => {
    const { message } = this.state;
    const { currentRecipientId, currentRecipientName, token } = this.props;
    const { user } = this;
    const sender = `${user.firstName} ${user.lastName}`;
    sendMessage(
      token,
      currentRecipientId,
      message,
      sender,
      currentRecipientName,
      this.updateMessages
    )
  }

  updateMessages = (results) => {
    this.socket.emit('SEND_INDIVIDUAL_MESSAGE', results)
  }

  render() {

    const { messages, user } = this.props;
    const dates = []

    const userTyping = this.state.userTyping ? 
    <View style={{ paddingLeft: 20, paddingBottom: 10 }}>
      <Text>
        {this.state.userTyping} is typing...
      </Text>
    </View>
    : null;

    return (

      <KeyboardAvoidingView
        behavior="padding"
        style={styles.containerTop}
      >
        <Header
          backgroundColor={colors.bgLight}
          statusBarProps={{ barStyle: 'dark-content' }}
          leftComponent={
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
              onPress={this.props.goBack}
            >
              <Icon
                color={colors.primary}
                name="ios-arrow-dropleft"
                type="ionicon"
              />
            </TouchableOpacity>
          }
          centerComponent={
            <Text
              style={{ color: colors.primary, fontSize: 24, fontWeight: '900' }}
            >
              {this.props.currentRecipientName}
            </Text>
          }
          rightComponent={
            <Avatar
              small
              rounded
              source={{ uri: this.state.profileImage }}
            />
          }
        />

        <ScrollView
          onContentSizeChange={this.handleSizeChange}
          ref={(scrollView) => this.scrollView = scrollView}
          style={{ padding: 10 }}
          >

          {this.props.messages.slice().reverse().map((message, index) => {
            const date = new Date(message.created_at).toDateString()
            const today = new Date().toDateString()
            const dateView = date === today ? 'Today' : date;
            const isSender = message.sender_id === user.id ? true : false;
            let displayDate = null;
            if (!dates.includes(date)) {
              dates.push(date)
              displayDate = <View>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  marginTop: 20
                }}>
                  <View style={styles.line} />
                  <Text
                    style={{
                      textAlign: 'center', fontSize: 16, color: colors.secondary, fontWeight: '700'
                    }}
                    >
                      {dateView}
                    </Text>
                  <View style={styles.line} />
                </View>
              </View>;
            }
            if (index >= this.props.messages.length - this.state.numOfMessages) {
              const { message_id, read } = message;
              const bg = isSender ? colors.secondary : colors.bgLight;
              const color = isSender ? colors.white : colors.black;
              const align = isSender ? 'flex-end' : 'flex-start';
              const messageStyle = {
                color,
                fontSize: 16,
                padding: 10,
              }
              if (!read && !isSender) {
                markAsRead(this.props.token, message_id, this.readMessage)
              }
              return (
                <View key={index}>

                  {displayDate}

                  <View
                    style={{ 
                      flex: 1, 
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      flexDirection: 'row', 
                      justifyContent: align
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: bg,
                        maxWidth: '70%'
                      }}
                    >
                      <Text
                        style={messageStyle}
                      >
                        {message.content}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            }
          })}

          {userTyping}

        </ScrollView>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.bgLight,
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <TextInput
            onChangeText={this.handleMessageChange}
            onFocus={() => setTimeout(() => this.scrollDown(true), 250)}
            style={{
              backgroundColor: colors.white,
              borderColor: colors.secondary,
              borderRadius: 4,
              borderWidth: 2,
              color: colors.black,
              padding: 5,
              marginRight: 5,
              flexGrow: 1,
            }}
            value={this.state.message}
          />
          <Icon
            color={this.state.message.trim() ? colors.primary : colors.disabled}
            name="md-send"
            onPress={this.submit}
            type="ionicon"
          />
        </View>

      </KeyboardAvoidingView>

    )

  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Message);
