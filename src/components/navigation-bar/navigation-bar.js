import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "../../../static/assets/images/logo/logo-1.png"

const NavigationBar = () => {
   const [user, setUser] = useState({})
   const [error, setError] = useState("")

   const handleLogout = () => {
      console.log('logout');

      setUser({})
      Cookies.remove("_sb%_user%_session")
      window.location.reload(false);
   }

   const getUser = () => {
      let userCookie = Cookies.get("_sb%_user%_session")
      let temp = 0
      let userIdArr = []

      if (userCookie !== undefined) {
         for (var i = 0; i < userCookie.length; i++) {
            if (userCookie[i] == "%") {
               temp += 1
            }

            if (temp === 2) {
               if (userCookie[i] !== "%") {
                  userIdArr.push(userCookie[i])
               }
            }
         }

         let userId = userIdArr.join('')

         axios.get(`http://localhost:8000/api/users/${userId}/`)
            .then(response => {
               console.log('response navbar user', response.data);

               if (response.data.length > 0) {
                  setUser(
                     response.data[0]
                  )
               } else {
                  handleLogout()
               }

            }).catch(error => {
               setError(
                  "An error ocurred"
               )
            });
      }
   }

   useEffect(() => {
      getUser()
   }, [])


   return (
      <div className="navbar-main-wrapper">
         <div className="contact-info">

            <div className="phone-icon-wrapper">
               <div className="icon">
                  <FontAwesomeIcon icon="globe" />
               </div>

               <div className="phone">
                  <p>You can find your favorites movies</p>
               </div>
            </div>
         </div>

         <div className="navbar-info">
            <div className="left-column">
               <img src={Logo} alt="logo" />
            </div>

            <div className="right-column">
               <div className="links-wrapper">
                  <div className="link">
                     <Link to="/">Home</Link>
                  </div>
                  {Object.entries(user).length > 0 ? user.users_authorization_id === 1 ? (
                     <div className="link">
                        <Link to="/admin">Admin</Link>
                     </div>

                  ) : null
                     : null
                  }

               </div>

               <div className="login-signup-wrapper">
                  {Object.entries(user).length > 0 ? (
                     <div className="user-info">
                        {user.name}<FontAwesomeIcon onClick={handleLogout} icon="sign-out-alt" />
                     </div>
                  )
                     :
                     (
                        <div className="auth-signup">
                           <div className="auth">
                              <Link to="/auth">Log in</Link>
                           </div>

                           <p className="or">or</p>

                           <Link to="/signup">
                              <div className="sign-up">
                                 <p>Sign up</p>
                              </div>
                           </Link>
                        </div>
                     )
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default NavigationBar;