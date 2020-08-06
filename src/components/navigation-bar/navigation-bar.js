import React, { Component } from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "../../../static/assets/images/logo/logo-1.png"

const NavigationBar = () => {

   return (
      <div className="navbar-main-wrapper">
         <div className="contact-info">
            <div className="phone-icon-wrapper">
               <div className="icon">
                  <FontAwesomeIcon icon="phone" />
               </div>

               <div className="phone">
                  <p>Llamanos para agendar tu cita al (801) 374-3045</p>
               </div>
            </div>

            <div className="phone-icon-wrapper">
               <div className="icon">
                  <FontAwesomeIcon icon="globe" />
               </div>

               <div className="phone">
                  <p>Tambien puedes agendarla online a traves de nuestro sitio web.</p>
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

                  <div className="link">
                     <Link to="/about">About</Link>
                  </div>

                  <div className="link">
                     <Link to="/dashboard">Dashboard</Link>
                  </div>
               </div>

               <div className="login-signup-wrapper">
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
            </div>
         </div>
      </div>
   )
}

export default NavigationBar;