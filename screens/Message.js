import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, FormInput, Header, Icon } from 'react-native-elements';

import { colors, styles } from '../assets/styles';

import MessageAPI from '../assets/APIs/messageAPI';

const messageAPI = new MessageAPI();

const { sendMessage } = messageAPI;

class Message extends Component {

  state = {
    message: '',
    numOfMessages: 20,
    loaded: false,
  }

  componentDidMount() {
    this.user = {}
    AsyncStorage.getItem('firstName').then(firstName => this.user.firstName = firstName)
    AsyncStorage.getItem('lastName').then(lastName => this.user.lastName = lastName)
  }

  handleMessageChange = (message) => {
    this.setState({ message })
  }

  handleSizeChange = (width, height) => {
    if (!this.state.loaded) {
      this.scrollView.scrollToEnd({ animated: false })
      this.setState({ loaded: true })
    }
  }

  submit = () => {
    const { message } = this.state;
    const { currentRecipientId, currentRecipientName, token } = this.props;
    const { user } = this;
    const sender = `${user.firstName} ${user.lastName}`;
    // TODO: start back here. Need to get first name and last name of recipient
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
    console.log('MESSAGE SENT', results)
    const message = results[0];
    this.props.messages.unshift(message)
    this.setState({ message: '' }, () => {
      setTimeout(() => {
        this.scrollView.scrollToEnd()
      }, 0)
    })
  }

  render() {

    const { messages } = this.props;
    const dates = []

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
        />

        <ScrollView
          onContentSizeChange={this.handleSizeChange}
          ref={(scrollView) => this.scrollView = scrollView}
        >

          {this.props.messages.slice().reverse().map((message, index) => {
            const date = new Date(message.created_at).toDateString()
            const today = new Date().toDateString()
            const dateView = date === today ? 'Today' : date;
            let displayDate = null;
            if (!dates.includes(date)) {
              dates.push(date)
              displayDate = <View>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                  marginRight: 10
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
              return (
                <View key={index}>

                  {displayDate}

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      padding: 20
                    }}
                  >
                    <Avatar
                      small
                      rounded
                      source={{ uri: message.profile_image_url || 'http://res.cloudinary.com/dsjyqaulz/image/upload/v1509814626/profile_image_placeholder_kn7eon.png' }}
                    />
                    <Text
                      style={{ marginLeft: 20, marginRight: 20, fontSize: 18 }}
                    >
                      {message.content}
                    </Text>
                  </View>
                </View>
              )
            }
          })}

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
