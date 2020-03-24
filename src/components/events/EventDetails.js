import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditEvent from "./EditEvent";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      // _id: "",
      // name: "",
      // date: "",
      guests: []
    };
  }

  componentDidMount() {
    this.getSingleEvent();
    this.getSingleInvitation();
  }

  getSingleEvent = () => {
    const { params } = this.props.match;
    axios
      .get(
        `https://book-it-ironhack-2020.herokuapp.com/api/events/${params.id}`
      )
      .then(responseFromApi => {
        const theEvent = responseFromApi.data;
        console.log("---------%%%%%%%%%%", theEvent);

        this.setState({ event: theEvent });

        // console.log("tyypee?? ", typeof theEvent.owner)
        // this.setState({
        //   event: {
        //     _id: theEvent._id,
        //     name: theEvent.name,
        //     date: theEvent.date,
        //     hour: theEvent.hour,
        //     restaurantName: theEvent.restaurantName,
        //     restaurantAddress: theEvent.restaurantAddress,
        //     owner: theEvent.owner,
        //   }
        // });
      })
      .catch(err => console.log(err));
  };

  // for invitations
  getSingleInvitation = () => {
    const params = this.props.match;
    // console.log("----------",params)
    axios
      .get(
        `https://book-it-ironhack-2020.herokuapp.com/api/invitation/${params.params.id}`
      )
      .then(responseFromApi => {
        this.setState({ guests: responseFromApi.data });
        // console.log("123456789",this.state.guests)
      })
      .catch(err => console.log(err));
  };

  renderEditForm = () => {
    // if (!this.state.event.name) {
    //   console.log("getting single event, again?");
    //   this.getSingleEvent();
    // } else {
    if (this.state.event.name) {
      return (
        <EditEvent
          theEvent={this.state.event}
          // getTheEvent={this.getSingleEvent}
          {...this.props}
        />
      );
    }

    // }
  };

  deleteEvent = () => {
    const { params } = this.props.match;
    axios
      .delete(
        `https://book-it-ironhack-2020.herokuapp.com/api/events/${params.id}`
      )
      .then(() => {
        this.props.history.push("/events");
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderOwnership() {
    return (
      <div>
        <br />
        <h1>{this.state.event.name}</h1>

        <div>{this.renderEditForm()} </div>
        <br />
        <button onClick={() => this.deleteEvent()} className="btn-danger">
          Delete event
        </button>

        <br />
        <br />
        <Link className="btn btn-info" to={"/events"}>
          {" "}
          Back to Events{" "}
        </Link>
      </div>
    );
  }

  renderGuestView() {
    return (
      <div className="container">
        <h1>Hello, I would be delighted if you can come to my event</h1>
        <br />
        <h2>Please confirm your presence bellow</h2>
        <br />
        <br />
        <div className="row">
          <div className=" col ">
            <Link
              to="/"
              id="progress-button"
              className="  bouncy progress-button"
              style={{ textDecoration: "none" }}
            >
              <button>
                <span>Accept</span>
              </button>
            </Link>
          </div>
          <div className=" col  ">
            <Link
              to="/"
              id="progress-button"
              className="  bouncy progress-button progress-button-refuse"
              style={{ textDecoration: "none" }}
            >
              <button>
                <span>Refuse</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // renderEventOwnerSection = () => {
  //   if (this.state.owner === this.props.uid) {
  //     return (
  //       <div>
  //         {this.renderEditForm()}
  //         <button className="btn btn-warning" onClick={() => this.deleteEvent()}>Delete Event</button>
  //       </div>
  //     );
  //   }
  // }

  render() {
    // console.log('another check', this.state.guests);
    const guest_emails = this.state.guests.map(g => g.email);
    // console.log(guest_emails)
    if (Object.keys(this.state.event).length === 0) {
      console.log("loading");
      return (
        <div>
          <p>loading...</p>
        </div>
      );
    } else if (this.state.event.owner === this.props.uid) {
      return this.renderOwnership();
    } else if (guest_emails.includes(this.props.user_email)) {
      return this.renderGuestView();
    } else {
      // console.log('ELSE, RETURN NULLLLLL')
      return null;
    }

  }
}

export default EventDetails;
