import React, { Component } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import FooterPage from "./FooterPage";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: []
    };
  }

  render() {
    return (
      <div>
        <div
          className="backgroundImage div-size div-left"
          style={{ width: "50%", float: "left" }}
        ></div>

        <div
          style={{ width: "50%", float: "right" }}
          className="div-size div-right"
        >
          <div>
            <h1 className="h1-home-text">
              Book an Event <br /> & <br /> Have a Good Time
            </h1>
            <br />
            <p className="home-text">
              No more endeless chat groups to book an event, now you have
              BookIT. In 3 steps you enjoy time with your friends and family.
              BookIT, it is a platform which helps you invite people for a
              dinner and make a list in the easiest way.
            </p>
          </div>
          <br />
          <div>
            <Link to="/notlogged" className="btn-events btn-events btn-lg">
              <strong>BookIT Now</strong>
            </Link>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default Home;
