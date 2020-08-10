import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MoviesList from '../dashboard/movies-list'
import ModalInsert from "../modals/modal-insert"


export default function Dashboard(props) {
   const [movies, setMovies] = useState([])
   const [action, setAction] = useState("")
   const [componentModalIsOpen, setComponentModalIsOpen] = useState(false)

   const handleModalClose = () => {
      setComponentModalIsOpen(
         false
      )

      setAction(
         ""
      )
   }

   const handleModalOpen = option => {
      setComponentModalIsOpen(
         true
      )

      setAction(
         option
      )
   }

   const handleSubmitInsertMovie = (newMovie) => {
      axios.post('http://localhost:8000/api/movies/',
         {
            title: newMovie.title,
            description: newMovie.description,
            genre: newMovie.genre,
            image_url: newMovie.image_url,
            year_release: newMovie.year_release,
            classification: newMovie.classification,
            duration: newMovie.duration
         })
         .then(response => {
            console.log('response insert movie', response.data);

            setMovies(
               [response.data, ...movies]
            )
         })
         .catch(error => {
            console.log("handleSubmitInsertMovie error: ", error);
         })
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
            <ModalInsert
               handleModalClose={handleModalClose}
               modalIsOpen={componentModalIsOpen}
               action={action}
               handleSubmitInsertMovie={handleSubmitInsertMovie}
            />

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