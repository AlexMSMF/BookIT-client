import React, { Component } from "react";
import axios from "axios";

class ZomatoApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      city: "",
      cuisine: ""
    };
  }

  handleCityInput = event => {
    this.setState({
      city: event.target.value
    });
  };

  handleCuisineInput = event => {
    this.setState({
      cuisine: event.target.value
    });
  };

  handleFormSubmit = event => {
    //alert(`${this.state.city} ${this.state.cuisine}`);
    event.preventDefault();
    this.apiCallZomato();
    this.setState({
      city: "",
      cuisine: ""
    });
  };

  apiCallZomato() {
    axios({
      method: "GET",
      url: `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city}&entity_type=city&q=${this.state.cuisine}&count=5`,
      //https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city}&entity_type=city&q=${this.state.cuisine}&count=5
      //https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city}&entity_type=city&count=10&cuisines=${this.state.cuisine}&sort=rating&order=desc
      headers: {
        "user-key": "e5974e8939c8556291798f25f46fd433",
        "content-type": "application/json"
      }
    })
      .then(res => {
        //console.log(res.data.restaurants);
        const restaurants = res.data.restaurants;
        this.setState({
          restaurants
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // componentDidMount() {
    
  // }

  render() {
    const date = this.props.location.state.date
    const name = this.props.location.state.name
    
    return (
      <div>
        <div style={{ width: "20%", float: "left" }}>
          {name}
          <br/>
          {date}
        </div>
        
        <form onSubmit={this.handleFormSubmit} style={{ width: "30%", float: "right" }}>
          <label>City of the Event: </label>
          <br />
          <select
            type="text"
            value={this.state.city}
            onChange={e => this.handleCityInput(e)}
            name="city"
          >
            <option>Select a City</option>
            <option value="82">Lisboa</option>
            <option value="311">Porto</option>
            <option value="61">London</option>
            <option value="280">New York</option>
            <option value="306">San Francisco</option>
          </select>
          <br />
          <br/>
          <label>Type of Cuisine: </label>
          <br/>
          {/* <input
            type="text"
            name="cuisine"
            value={this.state.cuisine}
            onChange={e => this.handleCuisineInput(e)}
          /> */}
          <select
            type="text"
            value={this.state.cuisine}
            onChange={e => this.handleCuisineInput(e)}
            name="cuisine"
          >
            <option>Select a Cuisine</option>
            <option value="portuguese">Portuguese</option>
            <option value="italian">italian</option>
            <option value="mexican">mexican</option>
            <option value="american">american</option>
            <option value="chinese">chinese</option>
          </select>
          <br />
          <input type="submit" value="Submit" />
        </form>

        <div style={{ width: "50%", float: "left" }}>
        {this.state.restaurants.map((item, index) => {
          return (
            <div key={index} className="container">
              <div className="row">
                <div className="col-3">
                  <h1> {item.restaurant.name} </h1>
                  <p> {item.restaurant.location.address} </p>
                  <h4> {item.restaurant.user_rating.aggregate_rating} </h4>
                  <h4> {item.restaurant.user_rating.rating_text} </h4>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    );
  }
}

export default ZomatoApi;
