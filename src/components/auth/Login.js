import React, { Component } from "react";
import { Link } from "react-router-dom";
import imgEvent from '../../images/event.png'

class Login extends Component {
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
 
    // this.props.history gets defined automatically inside of a <Route />
    // since we have access to history here, but not inside of App.js,
    // we can pass a "callback" function, which defines the function here, to be executed back in App.js
    const callback = () => this.props.history.push("/events", );
    this.props.loginFbaseUser(email, password, callback);
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
   
      <div className=" loginDiv">
        <div className="text-center">
        <form className="form-signin mt-5" onSubmit={this.handleFormSubmit}>
          <img className="mb-4" src={imgEvent} alt="Event" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
          <label className="sr-only">Email:</label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email adress"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <br/>
          <label className="sr-only">Password:</label>
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
            <input
              className="btn btn-lg btn-success btn-block"
              type="submit"
              value="Login"
            /> 
            <br/>
            <br/>
             <h5>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </h5>
          </div>
        </form>

        </div>
      </div>
    );
  }
}

export default Login;
