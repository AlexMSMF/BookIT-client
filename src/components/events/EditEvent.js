import React, { Component } from "react";
import axios from "axios";
<<<<<<< HEAD
// import { Link } from "react-router-dom";
=======
//import { Link } from "react-router-dom";
>>>>>>> 5430ffec9a592fc9a97d87580ec1e410e8f3cf7e
import ZomatoEdit from "./ZomatoEdit";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.theEvent.name,
      date: this.props.theEvent.date,
      restaurantName: this.props.theEvent.restaurantName,
      restaurantAddress: this.props.theEvent.restaurantAddress,
      guests: this.props.theEvent.guests,
      restId: this.props.theEvent._id
    };
  }

  handleFormSubmit = event => {
    const {
      name,
      date,
      restaurantName,
      restaurantAddress,
      guests
    } = this.state;

    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/events/${this.props.theEvent._id}`, {
        name,
        date,
        restaurantName,
        restaurantAddress,
        guests
      })
      .then(() => {
        this.props.getTheEvent();
        // after submitting the form, redirect to '/events'
        this.props.history.push("/events");
      })
      .catch(error => console.log(error));
  };

  handleChangeName = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleChangeDate = event => {
    this.setState({
      date: event.target.value
    });
  };

  handleChangeGuests = event => {
    this.setState({
      guests: event.target.guests
    });
  };


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


  render() {
    return (
      <div>
        <hr />
        <h3>Details </h3>
        <br />
        <form onSubmit={this.handleFormSubmit}>
          <label>Name of the Event:</label>
          <br />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={e => this.handleChangeName(e)}
          />
          <br />
          <label>Date of the Event:</label>
          <br />
          <input
            name="date"
            value={this.state.date}
            onChange={e => this.handleChangeDate(e)}
          />
          <br />
          <label>Number of guests:</label>
          <br />
          <input
            type="number"
            name="guests"
            value={this.state.guests}
            onChange={e => this.handleChangeGuests(e)}
          />
          <br />
          <input type="submit" value="Edit" className="btn btn-success" />
        </form>
        <br />
        <h5>Name and Address of the Restaurant</h5>
        <h6>{this.state.restaurantName}</h6>
        <h6>{this.state.restaurantAddress}</h6>
        <br />
        <br />
        {/* <Link
          to={{
            pathname: `/zomato`,
            state: {
              name: this.state.name,
              date: this.state.date,
              restId: this.state.restId
            }
          }}
          className="btn btn-info"
        >
          Change Restaurant
        </Link> */}
        <ZomatoEdit
          theEvent={this.state}
          getTheEvent={this.getSingleEvent}
          {...this.props}
        />
      </div>
    );
  }
}

export default EditEvent;
