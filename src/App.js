import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';
import HomePage from './pages/homepage/honmepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAdnSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.components.jsx';
class App extends React.Component {
  unsubscribeFromAuth = null;

  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAdnSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
