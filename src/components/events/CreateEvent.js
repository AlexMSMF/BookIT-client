import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import forkKnife from "../../images/forkknife.png";
import FooterPage from "../FooterPage";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      hour: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, date, hour } = this.state;

    axios
      .post("https://book-it-ironhack-2020.herokuapp.com/api/events", { name, date, hour })
      .then(() => {
        this.props.getData();
        this.setState({ name: "", date: "", hour: "" });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    
    this.setState({ [name]: value });
  };

  
  render() {
    return (
      <div className="loginDiv">
      <div class="container ">
        <div class="row">
          <div class="col-sm mt-3">
          <div className="row createDivCol mt-5">
                <div className="row">
                  <h3 className="h3-create-event">Choose the name of the event and set the Date and Time</h3>
                
                </div>
                <div className="col mt-4">
                <img
                    className="zomatoImage"
                    src="images/zomato-logo.jpg"
                    alt="Zomato"
                  />
                </div>
               
              </div>
              <p>Find the perfect place with our help</p>
          </div>
          <div class="col-sm mb-5 mt-3">
            <form
              className="creatingEventForm form-signin"
              onSubmit={this.handleFormSubmit}
            >
              <img
                className="mb-4"
                src={forkKnife}
                alt="Event"
                width="72"
                height="72"
              />
              <h1 className="h3 mb-3 font-weight-normal">Create your event</h1>
              <label>Name of the Event: </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.state.name}
                onChange={e => this.handleChange(e)}
              />
              <br />
              <label className="namedate">Date of the Event: </label>
              <br />
              <input
                type="date"
                className="form-control"
                name="date"
                value={this.state.date}
                onChange={e => this.handleChange(e)}
              />
              <br />
              <label className="namedate">Hour of the Event: </label>
              <br />
              <input
                type="time"
                className="form-control"
                name="hour"
                value={this.state.hour}
                onChange={e => this.handleChange(e)}
              />
              <Link
                to={{
                  pathname: "/zomato",
                  state: {
                    name: this.state.name,
                    date: this.state.date,
                    hour: this.state.hour
                  }
                }}
                className="btn btn-success "
              >
                Next
              </Link>
            </form>
            
          </div>
    
         
        
        </div>
      </div>
      <FooterPage  />
      </div>
    );
  }
}

export default CreateEvent;
