import React from 'react';
import PropTypes from 'prop-types';
import { Picker, Text, TextInput, View } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { Form, Item, Input, Label } from 'native-base';

import { colors, styles } from '../../../assets/styles';

function BasicInfo(props) {
  return (
    <View>
      <Card title="Basic Info">
        <Form>
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input
              onChangeText={text => props.handleInputChange(text, 'firstName')}
              value={props.firstName}
            />
          </Item>

          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input
              onChangeText={text => props.handleInputChange(text, 'lastName')}
              value={props.lastName}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Notification Email</Label>
            <Input
              onChangeText={text => props.handleInputChange(text, 'notificationEmail')}
              value={props.notificationEmail}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Login Email</Label>
            <Input style={{ color: colors.disabled }} disabled value={props.email} />
          </Item>

          <Item floatingLabel last>
            <Label>Zip Code</Label>
            <Input
              onChangeText={text => props.handleInputChange(text, 'zipCode')}
              value={props.zipCode}
            />
          </Item>
        </Form>
      </Card>
    </View>
  );
}

export default BasicInfo;
