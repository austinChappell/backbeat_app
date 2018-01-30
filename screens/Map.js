import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import MapView from 'react-native-maps';
import NavBar from '../components/NavBar';

Mapbox.setAccessToken('pk.eyJ1IjoiYXVzdGlud2MzMyIsImEiOiJjamN6cHV3Y3cxbmQ5Mnluc2J0MW1ianFrIn0.1VXh5wkY_-sCJLHxrmPomw');

export default class App extends Component<{}> {
  render() {
    const { navigation } = this.props;
    const markers = [
      {
        latitude: 37.78825,
        longitude: -122.4324,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      }
    ];
    return (
      <View style={styles.container}>
        <NavBar navigation={navigation} />
        <MapView
          style={styles.container}
          annotations={markers}
          initialRegion={{
            latitude: 32.777,
            longitude: -96.797,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker
            coordinate={{latitude: 32.777,
            longitude: -96.797}}
            title={"A Gig"}
            description={"House of Blues"}
          />
        </MapView>
        {/* <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Street}
            zoomLevel={12}
            centerCoordinate={[-96.797, 32.777]}
            style={styles.container}>
        </Mapbox.MapView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
