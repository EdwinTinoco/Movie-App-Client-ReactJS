import React, { useState, useContext, useEffect, Component } from "react"
import axios from "axios";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

import Image1 from '../../../static/assets/images/pictures/pic-2.jpg'


export default class SignUp extends Component {
   constructor(props) {
      super(props);

      this.state = {
         idLastUser: 0,
         name: "",
         email: "",
         password: "",
         messageUser: ""
      }

      this.handleSubmitRegisterNewUser = this.handleSubmitRegisterNewUser.bind(this)
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(e) {
      this.setState({
         [e.target.name]: e.target.value,
         messageUser: ""
      });
   }

   handleSubmitRegisterNewUser(e) {
      e.preventDefault();

      axios
         .post(
            'https://ejlt-djangorf-movie-api.herokuapp.com/api/users/signup/',
            {
               name: this.state.name,
               email: this.state.email,
               password: this.state.password
            },
         )
         .then(response => {
            console.log("new user", response.data)

            this.setState({
               name: "",
               email: "",
               password: "",
               messageUser: "User Added Succesfully!"
            })

            axios.get('https://ejlt-djangorf-movie-api.herokuapp.com/api/users/id/')
               .then(response => {
                  console.log("id last user", response.data[0][0])

                  this.setState({
                     idLastUser: response.data[0][0]
                  })

                  Cookies.set("_sb%_user%_session", `%encript%${response.data[0][0]}`, { expires: 7 })
               })
               .catch(error => {
                  console.log('handleSubmitRegisterNewUser error', error)
               })

            this.props.history.push("/");
            window.location.reload(false);
         })
         .catch(error => {
            console.log('handleSubmitRegisterNewUser error', error)
         })
   }

   render() {
      return (
         <div className="signup-main-wrapper" >
            <div className="have-an-account">
               <div className="title">
                  <p>Already have an account?</p>
               </div>

               <Link to="/auth">
                  <div className="login-button">
                     Login
                  </div>
               </Link>
            </div>

            <div className="signup-form-wrapper">
               <div className="left-side">
                  <div className="image">
                     <img src={Image1} alt='image' />
                  </div>
               </div>
               <div className="right-side">
                  <p>Sign up</p>

                  <form onSubmit={this.handleSubmitRegisterNewUser} className="signup-form">
                     <input type='text'
                        className='new-entry-input'
                        name="name"
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                     >
                     </input>

                     <input type='email'
                        className='new-entry-input'
                        name="email"
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                     >
                     </input>

                     <input type='password'
                        className='new-entry-input'
                        name="password"
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                     >
                     </input>

                     <div className="message">
                        <p>{this.state.messageUser}</p>
                     </div>

                     <button type='submit' className='add-button'>Sign up</button>
                  </form>
               </div>

            </div>

         </div>
      )
   }
}