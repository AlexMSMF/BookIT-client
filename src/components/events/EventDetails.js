import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditEvent from "./EditEvent";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getSingleEvent();
  }

  getSingleEvent = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/events/${params.id}`)
      .then(responseFromApi => {
        const theEvent = responseFromApi.data;
        this.setState(theEvent);
      })
      .catch(err => console.log(err));
  };

  renderEditForm = () => {
    if (!this.state.name) {
      this.getSingleEvent();
    } else {
      //   {...props} => so we can have 'this.props.history' in Edit.js                                                                                 |
      return (
        <EditEvent
          theEvent={this.state}
          getTheEvent={this.getSingleEvent}
          {...this.props}
        />
      );
    }
  };

  // DELETE PROJECT:
  deleteEvent = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/events/${params.id}`)
      .then(() => {
        this.props.history.push("/events");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1> {this.state.name} </h1> <p> {this.state.date} </p>{" "}
        <p> {this.state.local} </p> <div> {this.renderEditForm()} </div>{" "}
        <button onClick={() => this.deleteEvent()}> Delete event </button>{" "}
        {/ * <= = !!! * /} <br />
        <Link to={"/events"}> Back to Events </Link>{" "}
      </div>
    );
  }
}

export default EventDetails;
