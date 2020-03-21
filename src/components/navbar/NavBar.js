import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  renderAuthLinks() {
    // console.log("navbar: props.loggedInUser -> ", this.props.loggedInUser);
    const { loggedInUser, logoutFbase } = this.props;
    if (!loggedInUser) {
      return (
        <ul className='navbar-nav mr-auto '>
          
            <Link className=" nav-link " to={`/login`}>
            <li className="nav-item greenTitle">
            LogIn
            </li>
            </Link>
           
          <Link className="nav-link " to={`/signup`}>
          <li className="nav-item greenTitle">
             Sign Up 
             </li>
          </Link>
        
        </ul>
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
      <nav className="navbar navbar-expand-lg navbar navbar-color navbar-dark">
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
