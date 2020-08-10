import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MoviesItems from "./movies-items"

export default function MoviesContainer(props) {
   const [movies, setMovies] = useState([])
   const [moviesFilter, setMoviesFilter] = useState([])
   const [searchInput, setSearchInput] = useState('')

   const clearFilter = () => {
      setMovies(moviesFilter)
      setSearchInput("")
   }

   const handleFilter = (e) => {
      e.preventDefault()

      if (searchInput !== "") {

         setMovies(moviesFilter.filter((item) => {
            return item.title === searchInput
         }))
      }
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
            <MoviesItems key={item.id} item={item} />
         )
      })
   }

   useEffect(() => {
      getMoviesItems()
   }, [])


   return (
      <div className="movies-items-section">
         <div className="search-bar-movie">
            <p onClick={clearFilter}>All movies</p>

            <div className="input-button">
               <form onSubmit={handleFilter}>
                  <input type="text"
                     placeholder="Search movie"
                     value={searchInput}
                     onChange={({ target }) => { setSearchInput(target.value) }}
                  />

                  <button type="submit"><FontAwesomeIcon icon="search" /></button>
               </form>
            </div>

         </div>

         <div className="movies-items">
            {moviesItems()}
         </div>
      </div>
   )
}