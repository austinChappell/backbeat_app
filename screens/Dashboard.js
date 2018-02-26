import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-elements';

import { colors, styles } from '../assets/styles';

import NavBar from '../components/NavBar';

class Dashboard extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    // TODO: this setstate to false is tempory
    if (this.props.user.id) {
      this.stopLoading();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user.id !== this.props.user.id) {
      this.stopLoading();
    }
  }

  stopLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    const { navigation } = this.props;

    const content = this.state.loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    ) : (
      <View style={{ backgroundColor: colors.white, flexGrow: 1 }}>
        <NavBar navigation={navigation} />
        <View>
          <Text>Dashboard Screen</Text>
        </View>
      </View>
    );

    return content;
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Dashboard);
