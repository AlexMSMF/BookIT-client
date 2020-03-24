import React, { Component } from 'react'
import { Link } from "react-router-dom";


class notLogged extends Component {
  
    render() { 
        return ( 
            <div className="please-login-message">
            <p>
              Please <Link to="/login">Login</Link> or{" "}
              <Link to="/login">Sign up</Link> to view this page
            </p>
          </div>
         );
    }
}
 
export default notLogged;