import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import forkKnife from "../../images/forkknife.png";

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
    const { name, date } = this.state;

    axios
      .post("http://localhost:5000/api/projects", { name, date })
      .then(() => {
        this.props.getData();
        this.setState({ title: "", description: "" });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container mt-5 formNameDateRow ">
        <div className="row mb-2 w-50 ">
          <div className="col formNameDate">
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
              <h1 className="h1 mb-3 font-weight-normal">Create your event</h1>
              <label className="namedate">Name of the Event: </label>
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
              <Link
                to={{
                  pathname: "/zomato",
                  state: {
                    name: this.state.name,
                    date: this.state.date
                  }
                }}
                className="btn btn-danger mb-3"
              >
                Next
              </Link>
            </form>
          </div>
        </div>
        <div className="container">
          <div className="col">
            <h1>How to Zomato san?</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
