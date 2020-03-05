import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const name = this.state.name;
    const date = this.state.date;
    axios
      .post("http://localhost:5000/api/events", { name, date })
      .then((res) => {
        // this.props.getData();
        console.log(`=>`, res)
        this.setState({
            name: "",
            date: "",
          });
        this.props.hist.push(`/zomato/${res.data._id}`);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClickSubmit = event => {
    this.setState(

    )
  }

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
        </form>
        <input type="submit" value="Submit" />
        {/* <Link type="submit" to="/zomato">Next</Link> */}
      </div>
    );
  }
}

export default CreateEvent;
