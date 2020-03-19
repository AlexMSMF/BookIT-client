import React, { Component } from "react";
import axios from "axios";
import SendEmail from "../email/SendEmail";

class Guests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      hour: "",
      restaurantName: "",
      restaurantAddress: "",
      guests: ""
    };
  }

  handleFormSubmit = () => {
    const name = this.props.location.state.name;
    const date = this.props.location.state.date;
    const hour = this.props.location.state.hour;
    const restaurantName = this.props.location.state.restaurantId.name;
    const restaurantAddress = this.props.location.state.restaurantId.location
      .address;
    const guests = this.state.guests;
    const headers = { Authorization: this.props.jwt };

    return axios
      .post(
        "http://localhost:5000/api/events",
        {
          name,
          date,
          hour,
          restaurantName,
          restaurantAddress,
          guests
        },
        { headers }
      )
      .then(res => {
        //console.log(`=>`, res);
        this.setState({
          name: this.props.location.state.name,
          date: this.props.location.state.date,
          hour: this.props.location.state.hour,
          restaurantName: this.props.location.state.restaurantId.name,
          restaurantAddress: this.props.location.state.restaurantId.location
            .address
        });
        return res;
      })
      .catch(error => console.log(error));
  };

   handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const date = this.props.location.state.date;
    const name = this.props.location.state.name;
    const hour = this.props.location.state.hour;
    const restaurantId = this.props.location.state.restaurantId;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h5>Name of the Event:</h5>
              {name}
              <br />
              <h5>Date of the Event:</h5>
              {date}
              <br />
              <h5>Time of the Event:</h5>
              {hour}
              <br />
              <h5>Address of the Event:</h5>
              {restaurantId.location.address}
              <br />
              <h5>Restaurant name:</h5>
              {restaurantId.name}
            </div>
            <div className="col-sm">
              <SendEmail
                submit={this.handleFormSubmit}
                date={date}
                name={name}
                restaurantId={restaurantId}
                hour={hour}
              />
            </div>
            <div className="col-sm"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Guests;

