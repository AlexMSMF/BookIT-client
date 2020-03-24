import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import EventList from "./components/events/EventList";
import ZomatoApi from "./components/events/ZomatoApi";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import firebase from "firebase";
import SendEmail from "./components/email/SendEmail";
import ConfirmEmail from "./components/email/ConfirmEmail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EventDetails from "./components/events/EventDetails";
import CreateEvent from "./components/events/CreateEvent";
import Guests from "./components/events/Guests";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null,
      jwt: ""
    };
  }

  componentDidMount() {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_MY_GOOGLE_API_KEY,
      authDomain: "bookit-ad3fd.firebaseapp.com",
      databaseURL: "https://bookit-ad3fd.firebaseio.com",
      projectId: "bookit-ad3fd",
      storageBucket: "bookit-ad3fd.appspot.com",
      messagingSenderId: "610321258182",
      appId: "1:610321258182:web:d51a916d16185c6a68a9c7"
    });

    const loggedInUser = JSON.parse(window.sessionStorage.getItem("fbaseUser"));
    const jwt = window.sessionStorage.getItem("fbaseJwt");
    if (loggedInUser && jwt && !this.state.loggedInUser) {
      this.setState({ loggedInUser, jwt });
    }
  }

  getJWT(user, callbackNavToProj) {
    user
      .getIdToken()
      .then(resp => {
        this.setState({ jwt: resp });
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
        window.sessionStorage.setItem("fbaseUser", JSON.stringify(user));
        window.sessionStorage.setItem("fbaseJwt", resp);
        callbackNavToProj();
      })
      .catch(err => console.log(err));
  }

  createNewFbaseUser = (email, password, callbackNavToProj) => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // console.log(resp);
        this.setState({
          loggedInUser: resp.user
        });
        this.getJWT(resp.user);
        callbackNavToProj();
      })
      .catch(err => alert(err));
  };

  loginFbaseUser = (email, password, callbackNavToProj) => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        console.log(resp);
        this.setState({
          loggedInUser: resp.user
        });
        this.getJWT(resp.user, callbackNavToProj);
      })
      .catch(err => alert(err));
  };

  logoutFbaseUser = () => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sign-out
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User has been logged out");
        this.setState({
          loggedInUser: null,
          jwt: ""
        });
        window.sessionStorage.removeItem("fbaseUser");
        window.sessionStorage.removeItem("fbaseJwt");
      })
      .catch(err => alert(err));
  };

  render() {
    const { loggedInUser, jwt } = this.state;
    const uid = loggedInUser ? loggedInUser.uid : null;
    //console.log(uid);
    return (
      <div className="App">
        <NavBar
          loggedInUser={this.state.loggedInUser}
          logoutFbase={this.logoutFbaseUser}
        />{" "}
        <Switch>
          <Route exact path="/" component={Home} />{" "}
          <Route exact path="/about" component={About} />{" "}
          <Route
            exact
            path="/signup"
            render={props => (
              <SignUp createNewFbaseUser={this.createNewFbaseUser} {...props} />
            )}
          />{" "}
          <Route
            exact
            path="/login"
            render={props => (
              <Login loginFbaseUser={this.loginFbaseUser} {...props} />
            )}
          />{" "}
          <Route
            exact
            path="/events"
            render={props => <EventList uid={uid} jwt={jwt} {...props} />}
          />
          <Route exact path="/createEvent" component={CreateEvent} />
          <Route
            exact
            path="/events/:id"
            render={props => <EventDetails uid={uid} {...props} />}
          />
         
          <Route exact path="/zomato" component={ZomatoApi} />
          <Route
            exact
            path="/guests"
            render={props => <Guests uid={uid} jwt={jwt} {...props} />}
          />
          <Route exact path="/sendEmail" component={SendEmail}/>
          <Route exact path="/confirm" component={ConfirmEmail}/>
        </Switch>
      </div>
    );
  }
}

export default App;
