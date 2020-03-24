import React, { Component } from "react";
import { Link } from "react-router-dom";

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <h1>
          Hello emailName, I would be delighted if you can come to my event
        </h1>
        <br />
        <h2>Please confirm your presence bellow</h2>
        <br />
        <br />
        <div className="row">
          <div className=" col ">
            <Link to="/events/:id" id="progress-button" class="  bouncy progress-button" style={{ textDecoration: 'none' }}>
              <button>
                <span>Accept</span>
              </button>
            </Link>
          </div>
          <div className=" col  " >
            <Link to="/"  id="progress-button" class="  bouncy progress-button progress-buttonError" style={{ textDecoration: 'none' }}>
              <button>
                <span>Refuse</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmEmail;
