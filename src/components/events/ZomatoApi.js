import React, { Component } from "react";
import axios from "axios";

class ZomatoApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  apiCallZomato() {
    axios({
      method: "GET",
      url:
        "https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&q=&count=5",
      headers: {
        "user-key": "e5974e8939c8556291798f25f46fd433",
        "content-type": "application/json"
      }
    })
      .then(res => {
        console.log(res.data.restaurants);
        const restaurants = res.data.restaurants;
        this.setState({
          restaurants
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.apiCallZomato();
  }

  render() {
    return (
      <div>
        {this.state.restaurants.map((item, index) => {
          return (
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <h1> {item.restaurant.name} </h1>
                  <p> {item.restaurant.location.address} </p>
                  <h3> {item.restaurant.user_rating.aggregate_rating} </h3>
                  <h3> {item.restaurant.user_rating.rating_text} </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ZomatoApi;
