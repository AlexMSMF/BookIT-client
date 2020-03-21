import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import GoogleMap from "../GoogleMap"

// import CreateEvent from "./CreateEvent"; // <== !!!

class EventList extends Component {
  constructor() {
    super();
    this.state = {
      listOfEvents: []
    };
  }

  getAllEvents = () => {
    const headers = { Authorization: this.props.jwt };
    axios
      .get(`http://localhost:5000/api/events`, { headers })
      .then(responseFromApi => {
        console.log(responseFromApi.data);
        console.log(headers);

        this.setState({
          listOfEvents: responseFromApi.data
        });
      });
  };

  componentDidMount() {
    this.getAllEvents();
  }



  render() {

    
    const arrayOfEventsDivs = this.state.listOfEvents.map(event => {
      const addEventComponent = (
        <div  jwt={this.props.jwt}>
        
          <Link to={`/events/${event._id}`}>
          <div className="container">
           <div className="row">
             <div className="col">
               <img className="imageList" src="images/italian-logo.jpg"  alt="EventList"/>
             </div>
             <div className="col">
             <small>{event.date}</small>
             <br/>
               <strong>{event.name}</strong> 
               </div>
             <div className="col">{event.hour}</div>
           </div>
         </div>
          </Link>
          <hr/>
        </div>
      );
      return <div> {this.props.uid && addEventComponent}</div>;
    });
    const eventsAppearing = (
      <div className="create-background">
        <div className="container container-tiago">
          <div className="row">
            <div className="col tiago-design">
              <h3 className="h3-create-event">Your Events</h3>
              <hr/>
              <br />
              {arrayOfEventsDivs}
            </div>
            <hr/>
            <div className="col tiago-design-create ">
              <h3 className="h3-create-event">Create a new Event</h3>
       
              <hr/>
              <Link to="/createEvent" className="btn btn-success">
                Create Event!
              </Link>

           
            </div>
          </div>
        </div>
  
      </div>
   
      
    );

    return <div>{this.props.uid && eventsAppearing}</div>;
  }
}

export default EventList;
