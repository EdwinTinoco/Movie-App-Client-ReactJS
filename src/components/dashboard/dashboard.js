import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MoviesList from '../dashboard/movies-list'


export default function Dashboard(props) {
   const [movies, setMovies] = useState([])
   const [action, setAction] = useState("")
   const [componentModalIsOpen, setComponentModalIsOpen] = useState(false)

   const handleModalOpen = (option) => {

      console.log('holaaa');

      setComponentModalIsOpen(
         true
      )
      setAction(
         option
      )
   }

   const handleDeleteMovie = id => {
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
            <MoviesList
               key={item.id}
               item={item}
               handleDeleteMovie={handleDeleteMovie}
               action={action}
               componentModalIsOpen={componentModalIsOpen}
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

            <div className="add-movie">
               <p>Add Movie <FontAwesomeIcon icon="plus-circle" onClick={() => handleModalOpen("Insert")} /></p>
            </div>

            {moviesItems()}
         </div>
      </div>
   )
}