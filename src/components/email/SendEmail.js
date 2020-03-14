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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <br />
          <input type="text" name="name" className="form-control" id="exampleInputEmail1" placeholder="Inser your name" onChange={this.handleChange} />
          <br />
          <label>Email:</label>
          <br />
          <input type="email" name="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={this.handleChange} />
          <br />
          <label>Message:</label>
          <br />
          <textarea name="message" className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleChange}></textarea>
          <br />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>

    );
  }
}

export default SendEmail;
