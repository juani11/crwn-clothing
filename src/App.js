import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { checkUserSession, setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends React.Component {

  componentDidMount() {

    const { checkUserSession } = this.props;
    checkUserSession();

    /*    auth.onAuthStateChanged(async userAuth => {
         if (userAuth) {
   
           const userRef = await createUserProfileDocument(userAuth);
   
           userRef.onSnapshot(snapShot => {
             setCurrentUser({
               id: snapShot.id,
               ...snapShot.data()
             })
           })
         }
         else {
           setCurrentUser(userAuth);
         }
       }) */
  }

  render() {
    return (
      <div className="App" >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            } />
        </Switch>
      </div>
    );

  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);