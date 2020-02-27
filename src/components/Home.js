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
    axios.get(`https://localhost:5000/api/events`).then(res => {
      const item = res.data;
      console.log(item);
      this.setState({
        item: res.data
      });
    });
  }

  render() {
    const { item } = this.state;
    return (
      <div>
        {item.map(el => {
          return <img src={el.flag} style={{ width: "30px" }} alt="" />;
        })}
      </div>
    );
  }
}

export default Home;
