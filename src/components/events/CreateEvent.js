import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const name = this.state.name;
    const date = this.state.date;
    const headers = { Authorization: this.props.jwt };
    axios
      .post("http://localhost:5000/api/events", { name, date }, { headers })
      .then(() => {
        this.props.getData();

        this.setState({
          name: "",
          date: ""
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name of the Event: </label>
          <br />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Date of the Event: </label>
          <br />
          <input
            name="date"
            value={this.state.date}
            onChange={e => this.handleChange(e)}
          />
          <input type="submit" to="/events" />
        </form>
      </div>
    );
  }
}

export default CreateEvent;
