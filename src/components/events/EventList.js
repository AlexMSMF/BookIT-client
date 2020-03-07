import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CreateEvent from "./CreateEvent"; // <== !!!

class EventList extends Component {
  constructor() {
    super();
    this.state = { listOfEvents: [] };
  }

  getAllEvents = () => {
    axios.get(`http://localhost:5000/api/events`).then(responseFromApi => {
      console.log(responseFromApi.data);
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
          <p>{event.local} </p>
        </div>
      );
    });

    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col">
              <h3>Your Events</h3>
              {arrayOfEventsDivs}
            </div>
            <div class="col">
              <h3>Create your Event</h3>
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
