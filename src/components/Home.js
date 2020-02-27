import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: []
    };
  }

  componentDidMount() {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(res => {
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
      </div>
    );
  }
}

export default Home;
