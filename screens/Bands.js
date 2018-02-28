import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Picker, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Item, Input, Label } from 'native-base';
import NavBar from '../components/NavBar';

class Bands extends Component {
  state = {
    createFormVisible: false,
    genre: null,
    name: '',
  };

  handleInputChange = (text, key) => {
    const o = {};
    o[key] = text;
    this.setState(o);
  };

  handlePickerChange = (val, key) => {
    const o = {};
    o[key] = val;
    this.setState(o);
  };

  toggleModal = () => {
    const { createFormVisible } = this.state;
    this.setState({ createFormVisible: !createFormVisible });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <NavBar navigation={navigation} />
        <Modal visible={this.state.createFormVisible}>
          <View>
            <Card title="Start A Band">
              <Item floatingLabel>
                <Label>Band Name</Label>
                <Input
                  onChangeText={text => this.handleInputChange(text, 'name')}
                  value={this.state.name}
                />
              </Item>
              <View>
                <Label>Genre</Label>
                <Picker
                  selectedValue={this.state.genre}
                  style={{
                    marginTop: 0,
                  }}
                  onValueChange={val => this.handlePickerChange(val, 'genre')}
                >
                  <Picker.Item label="---" value={null} />
                  {this.props.genres.map((genre, index) => {
                    const selectionIndex = this.state.genre === genre.id;
                    return <Picker.Item key={index} label={genre.label} value={genre.id} />;
                  })}
                </Picker>
              </View>
            </Card>
          </View>
        </Modal>
        <View>
          <Button title="Create Your Own" onPress={this.toggleModal} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genresReducer.genres,
  token: state.userReducer.token,
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Bands);
