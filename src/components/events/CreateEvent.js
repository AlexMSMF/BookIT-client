import React, { Component } from "react";
import axios from "axios";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      local: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, date, local } = this.state;
    const headers = { Authorization: this.props.jwt };
    axios
      .post(
        "http://localhost:5000/api/events",
        { name, date, local },
        { headers }
      )
      .then(() => {
        this.props.getData();
        this.setState({ name: "", date: "", local: "" });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClickSubmit = event => {
    this.setState();
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
          <br />

          <label for="local">Choose a city:</label>
          <br />
          <select
            value={this.state.local}
            onChange={e => this.handleChange(e)}
            name="local"
          >
            <option value="">Select a city</option>
            <option value="Lisbon">Lisboa</option>
            <option value="Porto">Porto</option>
            <option value="Setubal">Setubal</option>
            <option value="Faro">Faro</option>
          </select>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateEvent;
