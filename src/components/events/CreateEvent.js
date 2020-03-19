import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import forkKnife from "../../images/forkknife.png";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      hour: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, date, hour } = this.state;

    axios
      .post("http://localhost:5000/api/events", { name, date, hour })
      .then(() => {
        this.props.getData();
        this.setState({ name: "", date: "", hour: "" });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm">
            <form
              className="creatingEventForm form-signin"
              onSubmit={this.handleFormSubmit}
            >
              <img
                className="mb-4"
                src={forkKnife}
                alt="Event"
                width="72"
                height="72"
              />
              <h1 className="h3 mb-3 font-weight-normal">Create your event</h1>
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
              <label className="namedate">Date of the Event: </label>
              <br />
              <input
                type="date"
                className="form-control"
                name="date"
                value={this.state.date}
                onChange={e => this.handleChange(e)}
              />
              <br />
              <label className="namedate">Hour of the Event: </label>
              <br />
              <input
                type="time"
                className="form-control"
                name="hour"
                value={this.state.hour}
                onChange={e => this.handleChange(e)}
              />
              <Link
                to={{
                  pathname: "/zomato",
                  state: {
                    name: this.state.name,
                    date: this.state.date,
                    hour: this.state.hour
                  }
                }}
                className="btn btn-success "
              >
                Next
              </Link>
            </form>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
