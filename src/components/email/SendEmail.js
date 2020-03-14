import React, { Component } from "react";
import axios from "axios";

class SendEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  handleSubmit = event => {
    event.preventDefault();
    const { name, email, message } = this.state;
    axios
      .post(
        "http://localhost:5000/api/guests",
        { name, email, message },
      )
      .then(() => {
        this.props.getData();
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <br />
        <input type="text" name="name" onChange={this.handleChange} />
        <br />
        <label>Email:</label>
        <br />
        <input type="email" name="email" onChange={this.handleChange} />
        <br />
        <label>Message:</label>
        <br />
        <input type="textarea" name="message" onChange={this.handleChange} />
        <br />
        <button>Send</button>
      </form>
    );
  }
}

export default SendEmail;
