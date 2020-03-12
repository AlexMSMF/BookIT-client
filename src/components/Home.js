import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import FooterPage from "./FooterPage"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: []
    };
  }

  componentDidMount() {
    axios.get(`https://localhost:5000/api/events`).then(res => {
      const item = res.data;
      console.log(item);
      this.setState({
        item: res.data
      });
    });
  }

  render() {
    return (
      <div >
        <div className="backgroundImage div-size div-left" style={{ width: '50%', float: 'left' }}>
          backgroundImage
        </div>

        <div style={{ width: '50%', float: 'right' }} className="div-size div-right">
          <div>
            <h1 className="h1-home-text">Book Event and Have a Good Time</h1>
            <br />
            <p className="blockquote text-right">
              No more endeless WhatsApp, Messenger groups to book an event, now you have BookIT. In 3 steps you enjoy time with your friends and family.
              BookIT it is a platform which helps you invite people for a dinner and make a list in the easiest way.
          </p>
          </div>
          <div>
            <Link to="/events" className="btn-events">
              <strong>Book Events</strong>
            </Link>
          </div>
        </div>
        <footer>
          Tiago & Alex
        </footer>
      </div>
    );
  }
}

export default Home;
