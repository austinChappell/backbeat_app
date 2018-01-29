import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import NavBar from '../components/NavBar';
import MapView from 'react-native-maps';

class Map extends Component {

  render() {

    const { navigation } = this.props;

    return (
      <View>
        <NavBar navigation={navigation} />
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Text>
          Map Screen
        </Text>
      </View>
    )
  }
}

export default Map;
