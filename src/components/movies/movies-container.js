import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MoviesItems from "./movies-items"

export default function MoviesContainer(props) {
   const [movies, setMovies] = useState([])
   const [moviesFilter, setMoviesFilter] = useState([])
   const [searchInput, setSearchInput] = useState('')

   const clearFilter = () => {
      setMovies(moviesFilter)
   }

   const handleFilter = () => {
      clearFilter()

      setMovies(moviesFilter.filter((item) => {
         return item.title === searchInput
      }))
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

   const handleSubmit = (e) => {
      e.preventDefault()

      console.log('submit');

   }

   useEffect(() => {
      getMoviesItems()
   }, [])


   return (
      <div className="movies-items-section">
         <div className="search-bar-movie">
            <p onClick={clearFilter}>All movies</p>

            <div className="input-button">
               <input type="text"
                  placeholder="Search movie"
                  value={searchInput}
                  onChange={({ target }) => { setSearchInput(target.value) }}
               />

               <button type="button" onClick={handleFilter}><FontAwesomeIcon icon="search" /></button>
            </div>

         </div>

         <div className="movies-items">
            {moviesItems()}
         </div>
      </div>
   )
}