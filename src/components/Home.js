import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <div>
        <h1>HOME SOMETHING</h1>
        <Link to="/events">Events</Link>
      </div>
    );
  }
}

export default Home;
