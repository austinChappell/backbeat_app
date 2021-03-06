import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card } from 'react-native-elements';
import { Form, Item, Input, Label } from 'native-base';

import { colors } from '../../../assets/styles';

const propTypes = {
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  notificationEmail: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
};

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

BasicInfo.propTypes = propTypes;

export default BasicInfo;
