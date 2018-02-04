import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Avatar, Header, Icon } from 'react-native-elements';

import { colors, styles } from '../assets/styles';

class Message extends Component {

  state = {
    numOfMessages: 20
  }

  render() {

    const { messages } = this.props;
    const dates = []

    return (

      <View
        style={styles.containerTop}
      >
        <Header
          backgroundColor={colors.bgLight}
          leftComponent={
            <Icon
              color={colors.primary}
              name="ios-arrow-dropleft"
              onPress={this.props.goBack}
              type="ionicon"
            />
          }
        />

        <ScrollView>

          {this.props.messages.map((message, index) => {
            const date = new Date(message.created_at).toDateString()
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
                      textAlign: 'center', fontSize: 16
                    }}
                    >
                      {date}
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
                      source={{ uri: message.profile_image_url || '' }}
                    />
                    <Text
                      style={{ marginLeft: 20, marginRight: 20 }}
                    >
                      {message.content}
                    </Text>
                  </View>
                </View>
              )
            }
          })}

        </ScrollView>

      </View>

    )

  }

}

export default Message;
