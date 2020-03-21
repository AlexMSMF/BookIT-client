import React, { Component } from "react";

import { Link } from "react-router-dom";

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
            <Link to="#">Terms &amp; Conditions</Link>
            <Link to="#">Private Policy</Link>
          </div>

          <div className="tiago-footer-third">
            <h4>Creators</h4>
            <Link to="#">Tiago Pereira (Web Developer)</Link>
            <Link to="#">Alexandre Florindo (Web Developer)</Link>
            <Link to="#">Aleksandra Sergiel (UX/UI)</Link>
          </div>

          <div className="tiago-footer-third">
            <h4>Resources</h4>
            <Link to="#">BootStrap</Link>
            <Link to="#">React JS</Link>
            <Link to="#">Firebase</Link>
            <Link to="#">Github</Link>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
