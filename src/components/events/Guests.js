import React, { Component } from "react";
import axios from "axios";

class Guests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: "",
      name: this.props.location.state.name,
      date: this.props.location.state.date,
      restaurantName: this.props.location.state.restaurantId.name,
      restaurantAddress: this.props.location.state.restaurantId.location.address
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const guests = this.state.guests;
    const name = this.props.location.state.name
    const date = this.props.location.state.date
    const restaurantName = this.props.location.state.restaurantId.name
    const restaurantAddress = this.props.location.state.restaurantId.location.address
    axios
      .post("http://localhost:5000/api/events", { guests, name, date, restaurantName, restaurantAddress })
      .then((res) => {
        //this.props.getData();
        console.log(`=>`, res)
        this.setState({
          name: this.props.location.state.name,
          date: this.props.location.state.date,
          restaurantName: this.props.location.state.restaurantId.name,
          restaurantAddress: this.props.location.state.restaurantId.location.address,
          guests: "",
        });
        //${res.data._id}
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };



  render() {
    const date = this.props.location.state.date
    const name = this.props.location.state.name
    const restaurantId = this.props.location.state.restaurantId

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
              ONDE VÃO APARECER OS FORMS
            </div>
            <div className="col-sm">
              <form onSubmit={this.handleFormSubmit}>
                <label>Number of the Guests: </label>
                <br />
                <input
                  type="text"
                  name="guests"
                  value={this.state.guests}
                  onChange={e => this.handleChange(e)}
                />
                <input type="submit" value="Submit" className="btn btn-primary"/>
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Guests;
