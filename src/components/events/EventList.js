import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import GoogleMap from "../GoogleMap"

// import CreateEvent from "./CreateEvent"; // <== !!!

class EventList extends Component {
  constructor() {
    super();
    this.state = {
      listOfEvents: []
    };
  }

  getAllEvents = () => {
    const headers = { Authorization: this.props.jwt };
    axios
      .get(`http://localhost:5000/api/events`, { headers })
      .then(responseFromApi => {
        console.log(responseFromApi.data);
        console.log(headers);

        this.setState({
          listOfEvents: responseFromApi.data
        });
      });
  };

  componentDidMount() {
    this.getAllEvents();
  }

  render() {
    const arrayOfEventsDivs = this.state.listOfEvents.map(event => {
      const addEventComponent = (
        <div key={event._id} jwt={this.props.jwt}>
          <Link  key={event._id} to={`/events/${event._id}`}>
            <ul>
              <li className="li-font">{event.name}</li>
              <hr/>
            </ul>
          </Link>
        </div>
      );
      return <div> {this.props.uid && addEventComponent}</div>;
    });
    const eventsAppearing = (
      <div className="create-background">
        <div className="container container-tiago">
          <div className="row">
            <div className="col tiago-design">
              <h3 className="h3-create-event">Your Events</h3>
              <br />
              {arrayOfEventsDivs}
            </div>
            <div className="col tiago-design">
              <h3 className="h3-create-event">Create a new Event</h3>
              <br />
              <Link to="/createEvent" className="btn btn-primary">
                HERE!
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

    return <div>{this.props.uid && eventsAppearing}</div>;
  }
}

export default EventList;
