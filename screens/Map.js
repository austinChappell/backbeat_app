import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import NavBar from '../components/NavBar';

class Map extends Component {
  state = {
    hasCurrentPosition: false,
    latitude: 32.777,
    longitude: -96.797,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  componentDidMount() {
    this.getLocation();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user !== this.props.user) {
      const { latitude, longitude } = newProps.user;
      if (!this.state.hasCurrentPosition) {
        this.updateRegion(latitude, longitude);
      }
    }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('POSITION', position);
      if (position) {
        const { latitude, longitude } = position.coords;
        this.setState({ latitude, longitude, hasCurrentPosition: true });
      }
    });
  };

  updateRegion = (latitude, longitude) => {
    this.setState({
      latitude,
      longitude,
    });
  };

  render() {
    console.log('USER', this.props.user);
    const { navigation, user } = this.props;
    const {
      latitude, longitude, latitudeDelta, longitudeDelta,
    } = this.state;
    const markers = [
      {
        latitude: 37.78825,
        longitude: -122.4324,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive',
      },
    ];

    return (
      <View style={styles.container}>
        <NavBar navigation={navigation} />
        <MapView
          showsUserLocation
          followsUserLocation
          style={styles.container}
          annotations={markers}
          initialRegion={{
            latitude: 32.777,
            longitude: -96.797,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: 32.777,
              longitude: -96.797,
            }}
            title="A Gig"
            description="House of Blues"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Map);
