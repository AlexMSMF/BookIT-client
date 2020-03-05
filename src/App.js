import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import EventList from "./components/events/EventList";
import ZomatoApi from "./components/events/ZomatoApi";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EventDetails from "./components/events/EventDetails";
//import ZomatoList from "./components/events/ZomatoList";
import CreateEvent from "./components/events/CreateEvent"


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/createEvent" component={CreateEvent} />
          <Route exact path="/events" component={EventList} />
          <Route exact path="/events/:id" component={EventDetails} />
          <Route exact path="/zomato" component={ZomatoApi} />
        </Switch>
      </div>
    );
  }
}

export default App;
