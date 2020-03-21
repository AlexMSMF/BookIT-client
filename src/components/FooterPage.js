import React, { Component } from "react";

// import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="tiago-footer">
        <div className="tiago-inner-footer">
          <div className="tiago-logo-container">
            <img src="/images/logo.png" alt="logo" /><br/>
            <address className="address">IronHack, <br/> Heden Santa Apolónia, Lisbon, Portugal</address>
          </div>
          <div className="tiago-footer-third">
            <h4>Need Help?</h4>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Private Policy</a>
          </div>

          <div className="tiago-footer-third">
            <h4>Creators</h4>
            <a href="#">Tiago Pereira (Web Developer)</a>
            <a href="#">Alexandre Florindo (Web Developer)</a>
            <a href="#">Alexandra Sergiel (UX/UI)</a>
          </div>

          <div className="tiago-footer-third">
            <h4>Resources</h4>
            <a href="#">BootStrap</a>
            <a href="#">React JS</a>
            <a href="#">Firebase</a>
            <a href="#">Github</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
