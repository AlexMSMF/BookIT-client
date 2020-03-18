import React, { Component } from "react";
import axios from "axios";

class SendEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eName: "",
      email: "",
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  sendEmail = event => {
    event.preventDefault();
    const { eName, email, message } = this.state;
    const { name, date, restaurantId } = this.props;
    axios
      .post("http://localhost:5000/api/guests", {
        eName,
        email,
        message,
        name,
        date,
        restaurantId
      })
      .then(() => {
        this.props.getData();
        this.submit();
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.sendEmail}>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="eName"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Inser your name"
            onChange={this.handleChange}
          />
          <br />
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={this.handleChange}
          />
          <br />
          <label>Personalize your message: (optional)</label>
          <br />
          <textarea
            name="message"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={this.handleChange}
          ></textarea>
          <br />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    );
  }
}

export default SendEmail;
