import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";

class ZomatoApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      restaurantName: "",
      restaurantAddress: "",
      showForm: false
    };
  }

  // Função que recente o input das cidades na pagina zomato
  handleCityInput = event => {
    this.setState({
      city: event.target.value
    });
  };

  // Função que recente o input das cozinhas(cuisines) na pagina zomato
  handleCuisineInput = event => {
    this.setState({
      cuisine: event.target.value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.apiCallZomato();
  }

  // Função que ao submeter irá mudar através do state o site abaixo da zomato.
  handleSubmit = event => {
    //alert(`${this.state.city} ${this.state.cuisine}`);
    const {
      restaurantName,
      restaurantAddress,
    } = this.state;
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/events/${this.props.theEvent._id}`, {
        restaurantName,
        restaurantAddress,
      })
      .then(() => {
        this.props.getTheEvent();
        // after submitting the form, redirect to '/events'
        this.props.history.push("/events");
      })
      .catch(error => console.log(error));
  };

  //API da zomato que nos mostra os restaurantes após escolhermos a cidade e cozinha no form.
  apiCallZomato() {
    axios({
      method: "GET",
      url: `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city}&entity_type=city&q=${this.state.cuisine}&count=9`,
      //https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city}&entity_type=city&q=${this.state.cuisine}&count=5
      //https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.city}&entity_type=city&count=10&cuisines=${this.state.cuisine}&sort=rating&order=desc
      headers: {
        "user-key": process.env.REACT_APP_ZOMATO_API_KEY,
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

  showForm() {
    this.setState({
      showForm: true
    })
  }

  showFormHandler() {
    if (this.state.showForm) {
      return (
        <div>
          <div className="container">
            <div className="row">
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
                          <input type="submit" value="Submit" onSubmit={this.handleSubmit} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-lg">
                <form onSubmit={this.handleSearch} >
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
      )
    }
  }

  render() {
    return (
      <div>
        {this.showFormHandler()}
        <button onClick={() => this.showForm()}>Edit Restaurant</button>
      </div>
    );
  }
}



export default ZomatoApi;
