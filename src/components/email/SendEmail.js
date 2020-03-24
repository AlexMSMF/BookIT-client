import React, { Component } from "react";
import axios from "axios";
class SendEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eName: "",
      email: "",
      message: "",
      event_id: "",
      guests: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log('eid', this.props.location.state.event_id);
    this.setState({ event_id: this.props.location.state.event_id });
    this.getInvitedGuests(this.props.location.state.event_id);
  }
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
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  createDBInvitation = event => {
    event.preventDefault();
    console.log('creating the invite');
    const { email, event_id, eName } = this.state;
    const postBody = { email, event_id, eName };
    axios.post("https://book-it-ironhack-2020.herokuapp.com/api/invitation", postBody)
      .then((res) => {
        //console.log('resp id', resp._id);
        console.log('invite was created');
        this.getInvitedGuests(event_id);
        this.sendEmail();
      })
      .catch(error => console.log(error));
  }
  sendEmail = () => {
    console.log('sending the email');

    const { eName, email, message, event_id } = this.state;

    console.log("((((((8((((",this.state.event_id)

    const date = this.props.location.state.date;
    const name = this.props.location.state.name;
    const hour = this.props.location.state.hour;
    const restaurantName = this.props.location.state.restaurantName;
    const restaurantAddress = this.props.location.state.restaurantAddress;
    axios
      .post("https://book-it-ironhack-2020.herokuapp.com/api/sendEmail", {
        eName,
        email,
        message,
        name,
        date,
        restaurantName,
        restaurantAddress,
        hour,
        event_id
      })
      .then((resp) => {
        console.log("acabei de enviar email");
        this.setState({
          eName: "",
          email: "",
          message: "",
        });
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div className="sendEmail-background">
        <br />
        <h2>
          Send an email to invite your friends!
        </h2>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-sm"></div>
            <div className="col-4">
              <h4 className="font-weight-light">Guests Invited</h4>
              {this.state.guests.map((item, index) => {
              console.log('item', item);
              return (
                <div
                  key={index}
                >
                  <div className="card-body">
                    <p>{item.eName}</p>
                  </div>
                </div>
              );
            })}
            </div>
            <div className="col-6">
              <form onSubmit={this.sendEmail}>
                <label className="font-weight-light">Name:</label>
                <br />
                <input
                  type="text"
                  name="eName"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Inser your name"
                  onChange={this.handleChange}
                />
                <br />
                <label className="font-weight-light">Email:</label>
                <br />
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  onChange={this.handleChange}
                />
                <br />
                <label className="font-weight-light">Personalize your message: (optional)</label>
                <br />
                <textarea
                  name="message"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={this.handleChange}
                ></textarea>
                <br />
                <button onClick={this.createDBInvitation} className="btn btn-primary">Send</button>
              </form>
            </div>
            <div className="col-sm"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default SendEmail;