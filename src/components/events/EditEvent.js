import React, { Component } from "react";
import axios from "axios";

import ZomatoEdit from "./ZomatoEdit";


class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.theEvent.name,
      date: this.props.theEvent.date,
      hour: this.props.theEvent.hour,
      restaurantName: this.props.theEvent.restaurantName,
      restaurantAddress: this.props.theEvent.restaurantAddress,
      restId: this.props.theEvent._id,
      guests: this.props.theEvent.guests
    };
  }

  handleFormSubmit = event => {
    const {
      name,
      date,
      hour,
      restaurantName,
      restaurantAddress,
    } = this.state;

    event.preventDefault();
    axios
      .put(`https://book-it-ironhack-2020.herokuapp.com/api/events/${this.props.theEvent._id}`, {
        name,
        date,
        hour,
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

  handleChangeName = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleChangeDate = event => {
    this.setState({
      date: event.target.value
    });
  };

  handleChangeHour = event => {
    this.setState({
      hour: event.target.value
    });
  };

  getSingleEvent = () => {
    const { params } = this.props.match;
    axios
      .get(`https://book-it-ironhack-2020.herokuapp.com/api/events/${params.id}`)
      .then(responseFromApi => {
        const theEvent = responseFromApi.data;
        this.setState(theEvent);
      })
      .catch(err => console.log(err));
  };


    getInvitedGuests = (eid) => {
      console.log('GIG', eid)
      axios.get(`https://book-it-ironhack-2020.herokuapp.com/api/invitation/${eid}`)
        .then((resp) => {
          //console.log('resp id', resp._id);
          console.log('received guest list', resp);
          this.setState({ guests: resp.data });
        })
        .catch(error => console.log(error));
    }



  render() {
    return (
      <div>
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col">
            <div className=".col-6">
              <form onSubmit={this.handleFormSubmit}>
                <label className="font-weight-light">Name of the Event:</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.handleChangeName(e)}
                  className="form-control"
                />
                <br />
                <label className="font-weight-light">Date of the Event:</label>
                <br />
                <input
                  type='date'
                  name="date"
                  value={this.state.date}
                  onChange={e => this.handleChangeDate(e)}
                  className="form-control"
                />
                <br />
                <label className="font-weight-light">Hour of the Event:</label>
                <br />
                <input
                  type='time'
                  name="hour"
                  value={this.state.hour}
                  onChange={e => this.handleChangeHour(e)}
                  className="form-control"
                />
                <br />
                <input type="submit" value="Edit" className="btn btn-success" />
              </form>
            </div>
            </div>
         
            <div className="col">
            <div className=".col-6">
              <h5 className="font-weight-light">Name of the Restaurant</h5>
              <h6>{this.state.restaurantName}</h6>
              <br/>
              <h5 className="font-weight-light">Address of the Restaurant</h5>
              <h6>{this.state.restaurantAddress}</h6>
              <br />
              <br />
              <ZomatoEdit
                theEvent={this.state}
                getTheEvent={this.getSingleEvent}
                {...this.props}
              />
            </div>
            </div>
        
            <div className="col">
             <h5 className="font-weight-light"> Event guests </h5>
       
           
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditEvent;

