import React, { Component } from "react";
import axios from "axios";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", date: "", local: "" };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const name = this.state.name;
    const date = this.state.date;
    const local = this.state.local;
    axios
      .post("http://localhost:5000/api/events", { name, date, local })
      .then(() => {
        // this.props.getData();
        this.setState({ name: "", date: "", local: "" });
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
          <label>Name of the Event:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
          <label>Date of the Event:</label>
          <textarea
            name="date"
            value={this.state.date}
            onChange={e => this.handleChange(e)}
          />
          <label>Local of the Event:</label>
          <textarea
            name="local"
            value={this.state.local}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateEvent;
