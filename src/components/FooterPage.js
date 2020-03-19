import React, { Component } from "react";

// import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      // <footer className="footerContainer">
      //   <section className="saveDate">
      //     <h4 className="redTextFooter">Creators</h4>
      //     <br />

      //     <h3>Ironhack Lisboa 2020</h3>
      //     <br />

      //     <p>Tiago Pereira & Alexandre Florindo</p>
      //     <p>Heden Santa Apolónia</p>
      //     <p>Portugal</p>
      //   </section>
      //   <section className="socialMedia">
      //     <h4 className="redTextFooter">SOCIAL MEDIA</h4>

      //     <div className="socialMediaIcons">
      //       <img src="images/github-logo.png" alt="Github" width="35px" />
      //     </div>
      //     <div className="socialMediaText">
      //       <div className="navegacao">
      //         <h3>About Us</h3>
      //         <p>Contacts</p>
      //         <p></p>
      //       </div>
      //       <div className="navegacao">
      //         <h3>Recursos</h3> 
      //         <p>Zomato.com</p>
      //         <p>Google Firebase</p>
      //         <p>FAQs</p>
      //       </div>
      //     </div>
      //   </section>
      // </footer>
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
