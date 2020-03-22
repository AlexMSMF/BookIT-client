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
      .get(`https://book-it-ironhack-2020.herokuapp.com/api/events/${params.id}`)
      .then(responseFromApi => {
        const theEvent = responseFromApi.data;
        this.setState(theEvent);
      })
      .catch(err => console.log(err));
  };

  // for invitations
  getSingleInvitation = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/invitation/${params.event_id}`)
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

  renderEventOwnerSection() {
    if (this.state.owner === this.props.uid) {
      return (
        <div>
          {this.renderEditForm()}
          <button className="btn btn-warning" onClick={() => this.deleteEvent()}>Delete Event</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <div>{this.renderEditForm()} </div>
        <br/>
        <button onClick={() => this.deleteEvent()} className="btn-danger">Delete event</button>
        <br />
        <br />
        <Link className="btn btn-info" to={"/events"}> Back to Events </Link>
      </div>
    );
  }
}

export default EventDetails;
