import React, { Component } from 'react';
import { createRootNavigator, SignedOut, SignedIn } from './router';
import { isSignedIn } from './auth';

import { Provider } from 'react-redux';
import store from './store/';
import { styles, color } from './assets/styles';

class App extends Component {

  state = {
    checkedSignIn: false,
    signedIn: false,
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert(err));
  }

  render() {

    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);

    return (
      <Provider store={store} >
        <Layout />
      </Provider>
    )

  }
}

export default App;
