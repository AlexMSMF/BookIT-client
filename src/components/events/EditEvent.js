import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.theEvent.name,
      date: this.props.theEvent.date,
      restaurantName: this.props.theEvent.restaurantName,
      restaurantAddress: this.props.theEvent.restaurantAddress,
      guests: this.props.theEvent.guests
    };
  }

  handleFormSubmit = event => {
    const { name, date, restaurantName, restaurantAddress, guests } = this.state;

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

  render() {
    return (
      <div>
        <hr />
        <h3>Details </h3>
        <br/>
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
            name="guests"
            value={this.state.guests}
            onChange={e => this.handleChangeGuests(e)}
          />
          <br />
          <input type="submit" value="Edit" className="btn btn-success" />
        </form>
        <br/>
        <h5>Name and Address of the Restaurant</h5>
        <h6>{this.state.restaurantName}</h6>
        <h7>{this.state.restaurantAddress}</h7>
        <br/>
        <br/>
        <Link to={{
          pathname: '/zomato',
          state: {
            name: this.state.name,
            date: this.state.date,
            _id: this.props.theEvent._id
          }
        }} className="btn btn-info">
          Change Restaurant
        </Link>
      </div>
    );
  }
}

export default EditEvent;
