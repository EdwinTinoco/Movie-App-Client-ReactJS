import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MoviesContainer from "../movies/movies-container"



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


               <div className="review">
                  <p>Review and comment your fav movies</p>
               </div>

            </div>

            <div className="movies-main-container">
               <MoviesContainer />
            </div>

         </div>
      )
   }
}