import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MoviesList(props) {
   const {
      id,
      title,
      image_url,
      year_release,
      classification
   } = props.item

   return (
      <div className="movies-list-wrapper">
         <div className="movies-info">
            <div className="img">
               <img src={image_url} alt="movie-picture" />
            </div>

            <div className="title-year">
               <p>{`${title}  -  ${year_release}`}</p>
            </div>
         </div>

         <div className="icons-buttons">
            <FontAwesomeIcon icon="edit" onClick={() => props.editMovieItem(id)} />
            <FontAwesomeIcon icon="trash" onClick={() => props.deleteMovieItem(id)} />
         </div>
      </div>
   )
}