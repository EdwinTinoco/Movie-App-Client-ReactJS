import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MoviesItems from "./movies-items"

export default function MoviesContainer(props) {
   const [movies, setMovies] = useState([])

   const getMoviesItems = () => {
      axios.get('http://localhost:8000/api/movies/')
         .then(response => {
            console.log('response', response.data)

            if (response.data.length > 0) {
               setMovies(
                  response.data
               )
            }
         })
         .catch(error => {
            console.log("getMoviesItems error: ", error);
         })
   }

   const moviesItems = () => {
      return movies.map(item => {
         return (
            <MoviesItems key={item.id} item={item} />
         )
      })
   }

   useEffect(() => {
      getMoviesItems()
   }, [])


   return (
      <div className="movies-items-section">
         <div className="search-movie">
            <input type="text" placeholder="Search" />
            <FontAwesomeIcon icon="plus-circle" />
         </div>

         <div className="movies-items">
            {moviesItems()}
         </div>
      </div>
   )
}