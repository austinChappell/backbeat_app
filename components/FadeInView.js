import React, { Component } from 'react';
import { Animated, View } from 'react-native';

class FadeInView extends Component {

  state = {
    opacity: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(
      this.state.opacity,
      {
        duration: this.props.duration,
        toValue: 1
      }
    ).start();
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.state.opacity }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default FadeInView;
