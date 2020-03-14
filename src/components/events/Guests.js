import React, { Component } from "react";
import axios from "axios";
import SendEmail from "../email/SendEmail";

class Guests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      restaurantName: "",
      restaurantAddress: "",
      guests: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const name = this.props.location.state.name;
    const date = this.props.location.state.date;
    const restaurantName = this.props.location.state.restaurantId.name;
    const restaurantAddress = this.props.location.state.restaurantId.location
      .address;
    const guests = this.state.guests;
    const headers = { Authorization: this.props.jwt };

    axios
      .post(
        "http://localhost:5000/api/events",
        {
          name,
          date,
          restaurantName,
          restaurantAddress,
          guests
        },
        { headers }
      )
      .then(res => {
        //this.props.getData();
        console.log(`=>`, res);

        this.setState({
          name: this.props.location.state.name,
          date: this.props.location.state.date,
          restaurantName: this.props.location.state.restaurantId.name,
          restaurantAddress: this.props.location.state.restaurantId.location
            .address,
          guests: ""
        });
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
    const restaurantId = this.props.location.state.restaurantId;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h5>Nome do Evento:</h5>
              {name}
              <br />
              <h5>Data do Evento:</h5>
              {date}
              <br />
              <h5>Morada do Evento:</h5>
              {restaurantId.location.address}
              <br />
              <h5>Nome do Restaurante:</h5>
              {restaurantId.name}
            </div>
            <div className="col-sm">
              <SendEmail name={name} date={date} restaurantId={restaurantId} submit={this.handleFormSubmit}/>
            </div>
            <div className="col-sm">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Guests;
