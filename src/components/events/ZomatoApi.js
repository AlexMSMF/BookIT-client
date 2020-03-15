import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import forkKnife from '../../images/indian-cuisine.jpg'

class ZomatoApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      restaurantName: "",
      restaurantAddress: "",
      cuisineImg: ""
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
    switch (event.target.value) {
      case "indian":
        this.setState({
          cuisineImg: "images/indian-cuisine.jpg"
        });
        break;
      case "brasilian":
        this.setState({
          cuisineImg: "images/brasilian-cuisine.jpg"
        });
        break;
      case "mexican":
        this.setState({
          cuisineImg: "images/mexican-cuisine.jpg"
        });
        break;
      case "italian":
        this.setState({
          cuisineImg: "images/italian-cuisine.jpg"
        });
        break;
      case "chinese":
        this.setState({
          cuisineImg: "images/chinese-cuisine.jpg"
        });
        break;
      case "american":
        this.setState({
          cuisineImg: "images/american-cuisine.jpg"
        });
        break;
      case "portuguese":
        this.setState({
          cuisineImg: "images/portuguese-cuisine.jpg"
        });
        break;
      case "japanese":
        this.setState({
          cuisineImg: "images/japanese-cuisine.jpg"
        });
        break;
      default:
        this.setState({
          cuisineImg: "images/forkknife.png"
        });
    }
  };

  // Função que ao submeter irá mudar através do state o site abaixo da zomato.
  handleFormSubmit = event => {
    //alert(`${this.state.city} ${this.state.cuisine}`);
    event.preventDefault();
    this.apiCallZomato();
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

  render() {
    const date = this.props.location.state.date;
    const name = this.props.location.state.name;
    //const restId = this.props.location.state.restId

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h5>Nome do Evento:</h5>
              {name}
              <br />
              <h5>Data do Evento</h5>
              {date}
            </div>
            <div className="col-sm">
              <form
                className="creatingEventForm form-signin"
                onSubmit={this.handleFormSubmit}
              >
                <img
                  className="mb-4"
                  src={this.state.cuisineImg}
                  alt="Event"
                  width="200"
                  height="200"
                />
                <h1 className="h3 mb-3 font-weight-normal">
                  Choose a Restaurant and Cuisine
                </h1>
                <label className="sr-only">City of the Event: </label>
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
                <label className="sr-only">Type of Cuisine: </label>
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
                  <option value="brasilian">Brasilian</option>
                  <option value="italian">Italian</option>
                  <option value="mexican">Mexican</option>
                  <option value="american">American</option>
                  <option value="chinese">Chinese</option>
                  <option value="indian">Indian</option>
                  <option value="japanese">Japanese</option>
                </select>
                <br />
                <input
                  className="btn btn-success "
                  type="submit"
                  value="Search"
                />
              </form>
            </div>
            <div className="col-sm">
              {this.state.restaurants.map((item, index) => {
                console.log(item);
                return (
                  <div key={index} className="card" style={{ width: "18rem" }}>
                    <img
                      className="cuisinesImage"
                      src={this.state.cuisineImg}
                      alt="Hello"
                    />
                    <div className="card-body">
                      <h1 className="card-title"> {item.restaurant.name} </h1>
                      <p className="card-text">
                        {item.restaurant.location.address}
                      </p>
                      <p className="card-text">
                        {item.restaurant.user_rating.aggregate_rating}
                      </p>
                      <p className="card-text">
                        {item.restaurant.user_rating.rating_text}
                      </p>
                      <Link
                        to={{
                          pathname: "/guests",
                          state: {
                            name,
                            date,
                            restaurantId: item.restaurant
                          }
                        }}
                        className="btn btn-success"
                      >
                        Next
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ZomatoApi;
