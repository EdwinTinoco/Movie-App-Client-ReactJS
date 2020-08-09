import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MoviesList from '../dashboard/movies-list'


export default function Dashboard(props) {
   const [movies, setMovies] = useState([])

   const deleteMovieItem = id => {
      fetch(`http://localhost:8000/api/movies/${id}/`, {
         method: "DELETE"
      })
         .then(
            setMovies(
               movies.filter(item => {
                  return item.id !== id;
               })
            )
         )
   }

   const editMovieItem = id => {
      console.log('edit movie');

   }

   const getMoviesItems = () => {
      axios.get('http://localhost:8000/api/movies/')
         .then(response => {
            console.log('response', response.data)

            if (response.data.length > 0) {
               setMovies(
                  response.data
               )

               setMoviesFilter(
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
            <MoviesList
               key={item.id}
               item={item}
               deleteMovieItem={deleteMovieItem}
               editMovieItem={editMovieItem}
            />
         )
      })
   }

   useEffect(() => {
      getMoviesItems()
   }, [])

   return (
      <div className="dashboard-main-wrapper">
         <div className="movies-main-wrapper">
            <div className="main-title">
               <p>Movies List</p>
            </div>

            {moviesItems()}
         </div>
      </div>
   )
}