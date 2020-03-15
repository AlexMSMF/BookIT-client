import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  renderAuthLinks() {
    // console.log("navbar: props.loggedInUser -> ", this.props.loggedInUser);
    const { loggedInUser, logoutFbase } = this.props;
    if (!loggedInUser) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link greenTitle" to={`/login`}>
              <ul>
                <li className=" greenTitle">LogIn</li>
              </ul>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link greenTitle" to={`/signup`}>
              <ul>
                <li className=" greenTitle">Sign Up</li>
              </ul>
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <React.Fragment>
          <li className="greenTitle nav-link ">
            <span className=" greenTitle">Welcome, {loggedInUser.email}</span>
          </li>

          <Link className="nav-link" to="/" onClick={logoutFbase}>
            <li className=" greenTitle">Log Out</li>
          </Link>
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={`/`}>
          <li className="greenTitle"><img src="/images/logo.png" alt="logo" width="65px"/></li>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <Link className="nav-link greenTitle" to={`/events`}>
              <li className=" greenTitle">Events</li>
            </Link>

            {this.renderAuthLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
