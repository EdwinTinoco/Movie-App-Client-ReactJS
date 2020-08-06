import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Home extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="home-main-wrapper">
            <div className="title-info-img">
               <div className="title">
                  <p>Movie Web Application</p>
               </div>

               <div className="info">
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a felis
                     non sem elementum tempor in at urna. Suspendisse auctor libero ut nibh
                     consequat sed sagittis dolor iaculis. Donec condimentum mauris nec eros
                     auctor sed vestibulum tellus consequat.
                  </p>
               </div>

               <Link to="/auth">
                  <div className="button">
                     <p>Agenda tu cita online</p>
                  </div>
               </Link>
            </div>

            <div className="movies-main-section">
               <div className="movies-section">

               </div>
            </div>

            <div className="services-link">
               <Link to="/services">
                  <div className="button">
                     <div className="icon">
                        <FontAwesomeIcon icon="calculator" />
                     </div>
                  Que tramite o servicio necesitas?
               </div>
               </Link>
            </div>
         </div>
      )
   }
}