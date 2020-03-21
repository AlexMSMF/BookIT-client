import React, { Component } from "react";
import { Link } from "react-router-dom";
import imgEvent from "../../images/event.png";
import FooterPage from "../FooterPage";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    const callback = () => this.props.history.push("/events");
    this.props.createNewFbaseUser(email, password, callback);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className="loginDiv">
      <div className="text-center">
        <form className="form-signin mt-5" onSubmit={this.handleFormSubmit}>
          <img
            className="mb-4"
            src={imgEvent}
            alt="Event"
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
          <label className="sr-only"> Email: </label>{" "}
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email adress"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <br/>
          <label className="sr-only"> Password: </label>{" "}
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <br/>
          <div className="checkbox mb-3">
            <input className="btn btn-lg btn-success btn-block" type="submit" value="Signup" />
            <br/>
            <br/>
            <p>
              Already have account ?<Link to={"/login"}> Login </Link>
            </p>
          </div>
        </form>
      </div>
      <FooterPage />
      </div>
    );
  }
}

export default SignUp;
