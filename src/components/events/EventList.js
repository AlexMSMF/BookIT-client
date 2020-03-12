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
        <div className="container">
          <div className="row">
            <div className="col">
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

    return <div>{this.props.uid && piçodocu}</div>;
  }
}

export default EventList;
