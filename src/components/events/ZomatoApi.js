import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ZomatoApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      name: "",
      date: "",
      city: "",
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
      url: `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city}&entity_type=city&q=${this.state.cuisine}&count=9`,
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
  //   if id 
  //     axios.get(id)
  //       .then(resp)

  // }

  render() {
    const date = this.props.location.state.date
    const name = this.props.location.state.name
    const _id = this.props.location.state
    console.log('id:',_id)

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <div >
                <h5>Nome do Evento:</h5>
                {name}
                <br />
                <h5>Data do Evento</h5>
                {date}
              </div>
            </div>
            <div className="col-lg">
              <div className="row">
                {this.state.restaurants.map((item, index) => {
                  console.log(item)
                  return (
                    <div key={index} className="card" style={{ width: "18rem" }}>
                      <div className="card-body">
                        <h1 className="card-title"> {item.restaurant.name} </h1>
                        <p className="card-text"> {item.restaurant.location.address} </p>
                        <p className="card-text"> {item.restaurant.user_rating.aggregate_rating} </p>
                        <p className="card-text"> {item.restaurant.user_rating.rating_text} </p>
                        <Link to={{
                          pathname: '/guests',
                          state: {
                            name,
                            date,
                            city: this.state.city,
                            restaurantId: item.restaurant
                          }
                        }} className="btn btn-primary">Next</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg">
              <form onSubmit={this.handleFormSubmit} >
                <label>City of the Event: </label>
                <br />
                <select
                  className="form-control"
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
                <br />
                <label>Type of Cuisine: </label>
                <br />
                {/* <input
            type="text"
            name="cuisine"
            value={this.state.cuisine}
            onChange={e => this.handleCuisineInput(e)}
          /> */}
                <select
                  className="form-control"
                  type="text"
                  value={this.state.cuisine}
                  onChange={e => this.handleCuisineInput(e)}
                  name="cuisine"
                >
                  <option>Select a Cuisine</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="italian">Italian</option>
                  <option value="mexican">Mexican</option>
                  <option value="american">American</option>
                  <option value="chinese">Chinese</option>
                </select>
                <br />
                <input className="btn btn-primary" type="submit" value="Search" />
              </form>
            </div>
          </div>
        </div>


      </div>
    );
  }
}



export default ZomatoApi;
