import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

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
      .get(`https://book-it-ironhack-2020.herokuapp.com/api/events`, {
        headers
      })
      .then(responseFromApi => {
        //console.log(responseFromApi.data);
        //console.log(headers);

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
        <div jwt={this.props.jwt}>
          <Link to={`/events/${event._id}`}>
            <table className="table table-borderless">
              <thead className="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="text-left">{event.date}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-left">{event.hour}</th>
                  <td className="text-left">{event.name}</td>
                </tr>
              </tbody>
            </table>
          </Link>
          <hr />
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
            <div className="col tiago-design-create ">
              <h3 className="h3-create-event">Create a new Event</h3>
              <hr />
              <Link to="/createEvent" className="create-event-button">
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
