import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
          </div>
          <div className="col-6">
            <form onSubmit={this.handleFormSubmit}>
              <label>Name of the Event: </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.state.name}
                onChange={e => this.handleChange(e)}
              />
              <br />
              <label>Date of the Event: </label>
              <br />
              <input
                className="form-control"
                name="date"
                value={this.state.date}
                onChange={e => this.handleChange(e)}
              />
              <br />
              <Link to={{
                pathname: '/zomato',
                state: {
                  name: this.state.name,
                  date: this.state.date
                }
              }} className="btn btn-primary">Next</Link>
            </form>
          </div>
          <div className="col-sm">
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;

