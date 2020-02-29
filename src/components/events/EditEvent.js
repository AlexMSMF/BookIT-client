import React, { Component } from 'react';
import axios from 'axios';

class EditEvent extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: this.props.theEvent.name, 
        date: this.props.theEvent.date,
        local: this.props.theEvent.local
    }
  }

    
  handleFormSubmit = (event) => {
    const {name, date, local} = this.state;

    event.preventDefault();

    axios.put(`http://localhost:5000/api/events/${this.props.theEvent._id}`, { name, date, local })
    .then( () => {
        this.props.getTheEvent();
        // after submitting the form, redirect to '/events'
        this.props.history.push('/events');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeName = (event) => {  
    this.setState({
      name:event.target.value
    })
  }

  handleChangeDate = (event) => {  
    this.setState({
      date:event.target.value
    })
  }

  handleChangeLocal = (event) => {  
    this.setState({
      local:event.target.value
    })
  }

  render(){
    return (
      <div>
        <hr />
        <h3>Edit</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name of the Event:</label>
          <br/>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChangeName(e)}/>
          <br/>
          <label>Date of the Event:</label>
          <br/>
          <input name="date" value={this.state.date} onChange={e => this.handleChangeDate(e)} />
          <br/>
          <label>Local of the Event:</label>
          <br/>
          <input name="local" value={this.state.local} onChange={e => this.handleChangeLocal(e)} />
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EditEvent;