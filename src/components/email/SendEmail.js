import React, { Component } from "react";
import Axios from "axios";

class SendEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: ""
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = e => {
    this.setState(
      {[e.target.name]: e.target.value}
    )
  }

  async handleSubmit(e) {
    e.preventDefault()
    const { name, email, message} = this.state

    const form = await Axios.post('api/guests', {
      name,
      email,
      message
    })
  }

  render() {
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <label for="name">Name:</label>
        <input type="text" name="name" onChange={this.handleChange} />
        <label for="email">Email:</label>
        <input type="email" name="email" onChange={this.handleChange} />
        <label for="message">Message:</label>
        <input type="textarea" name="message" onChange={this.handleChange} />
        <button>Send</button>
      </form>
    );
  }
}

export default SendEmail;
