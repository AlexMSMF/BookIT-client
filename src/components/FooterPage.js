import React, { Component } from "react";
// import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="footerContainer">
        <section className="saveDate">
          <h4 className="redTextFooter">Creators</h4>
          <br />

          <h3>Ironhack Lisboa 2020</h3>
          <br />

          <p>Tiago Pereira & Alexandre Florindo</p>

          <p>Heden Santa Apolónia</p>
          <p>Portugal</p>
        </section>
        <section className="socialMedia">
          <h4 className="redTextFooter">SOCIAL MEDIA</h4>

          <div className="socialMediaIcons">
            <img
              src="../public/images/icons8-facebook-f-250.png"
              alt="Github"
            />
           
          </div>
          <div className="socialMediaText">
            <div className="navegacao">
              <h3>About Us</h3>
              <br />
              <p>Contacts</p>
              <p></p>
            </div>
            <div className="navegacao">
              <h3>Recursos</h3>
              <br />
              <p>Zomato.com</p>
              <p>Google Firebase</p>
              <p>FAQs</p>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;
