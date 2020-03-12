import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import CreateEvent from "./CreateEvent";

// import CreateEvent from "./CreateEvent"; // <== !!!

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
      const addEventComponent = (
        <div
          key={event._id}
          jwt={this.props.jwt}
          getData={() => this.getAllEvents()}
        >
          <Link to={`/events/${event._id}`}>
            <ul>
              <li>{event.name}</li>
            </ul>
          </Link>
        </div>
      );
      return <div> {this.props.uid && addEventComponent}</div>;
    });
    const piçodocu = (
      <div>
        <div style={{ width: "60%", float: "left" }}>
          <h3>Your Events</h3>
          {arrayOfEventsDivs}
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <h3>Create your Event</h3>
        </div>
        <Link to="/createEvent">HERE!</Link>
      </div>
    );

    return <div>{this.props.uid && piçodocu}</div>;
  }
}

export default EventList;
