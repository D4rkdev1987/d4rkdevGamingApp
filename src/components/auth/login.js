import React, { Component } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Login extends Component {
  constructor(props) {
      super(props)

      this.state = {
          email: "",
          password: "",
          errorText: ""
      }

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value,
        errorText: ""
    })
  }

  handleSubmit(event) {
    axios.post("https://api.devcamp.space/sessions", 
        {
            client: {
                email:this.state.email,
                password:this.state.password
            }
        },
        {withCredentials: true }
    ).then(response => {
        if (response.data.status === 'created') {
            this.props.handleSuccessfulAuth();
        } else {
            this.setState({
                errorText: "Wrong email and password"
            })
            this.props.handleUnSuccessfulAuth();
        }
    }).catch(error => {
        this.setState({
            errorText: "An error Occrued"
        })
        this.props.handleUnSuccessfulAuth();
    })
    event.preventDefault();
  }

  render() {
      return (
          <div>
            <h1>Login here</h1>

            <div>{this.state.errorText}</div>
            <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                <div className="form-group">
                    <FontAwesomeIcon icon="spider" />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Enter Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                <FontAwesomeIcon icon="meteor" />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    /> 
                </div>
                    <button className="btn" type="submit">Login</button>
            </form>  
          </div>
      )
  }
}