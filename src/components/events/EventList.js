import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMap"

import CreateEvent from "./CreateEvent"; // <== !!!

class EventList extends Component {
  constructor() {
    super();
    this.state = { 
      listOfEvents: [] 
    };
  }

  getAllEvents = () => {
    axios.get(`http://localhost:5000/api/events`).then(responseFromApi => {
      //console.log(responseFromApi.data);
      this.setState({
        listOfEvents: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    //console.log(this.props.history);
    this.getAllEvents();
  }

  render() {
    const arrayOfEventsDivs = this.state.listOfEvents.map(event => {
      return (
        <div key={event._id}>
          <Link to={`/events/${event._id}`}>
            <ul>
              <li>{event.name}</li>
            </ul>
          </Link>
        </div>
      );
    });

    const addEventComponent = (
      <CreateEvent jwt={this.props.jwt} getData={() => this.getAllEvents()} />
    );

    return (
      <div>
<<<<<<< HEAD
        {/* <GoogleMap /> */}
        <div className="container">
          <div className="row">
            <div className="col">
=======
        {this.props.uid && addEventComponent}
        <div style={{ width: "60%", float: "left" }}>
          <h3>Your Events</h3>
          {arrayOfEventsDivs}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <h3>Create your Event</h3>
        </div>
        <Link to="/createEvent">HERE!</Link>
        <div class="container">
          <div class="row">
            <div class="col">
>>>>>>> 3fed3eb3233e583213749787bdf5f66fe0c45d94
              <h3>Your Events</h3>
              <br/>
              {arrayOfEventsDivs}
            </div>
            <div className="col">
              <h3>Create your Event</h3>
              <br/>
              <Link to="/createEvent" className="btn btn-primary">
                HERE!
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventList;
