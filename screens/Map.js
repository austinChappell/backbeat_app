import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import NavBar from '../components/NavBar';

function Map(props) {
  console.log('USER', props.user);
  const { navigation, user } = props;
  const { latitude, longitude } = user;
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
          latitude: latitude || 32.777,
          longitude: longitude || -96.797,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Map);
