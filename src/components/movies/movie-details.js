import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MovieDetails(props) {
   const [movie, setMovie] = useState({})

   const getMovieItem = () => {
      axios.get(`http://localhost:8000/api/movies/${props.match.params.slug}/`)
         .then(response => {
            console.log('movie item', response.data)
            setMovie(
               response.data[0]
            )

         }).catch(error => {
            console.log('getMovieItem error', error);
         })
   }

   useEffect(() => {
      getMovieItem();
   }, [])

   const {
      id,
      title,
      description,
      genre,
      image_url,
      year_release,
      classification,
      duration,
      rated
   } = movie

   return (
      <div className="movie-detail-main-wrapper">
         <div className="movie-detail-wrapper">
            <div className="image">
               <img src={image_url} alt="movie-image" />
            </div>

            <div className="details">
               <div className="title">
                  <p>{title}</p>
               </div>

               <div className="title">
                  <p>{rated}</p>
               </div>

               <div className="title">
                  <p>{year_release}</p>
               </div>

               <div className="title">
                  <p>{classification}</p>
               </div>

               <div className="title">
                  <p>{duration}</p>
               </div>

               <div className="title">
                  <p>{genre}</p>
               </div>

               <div className="descr">
                  <p>{description}</p>
               </div>
            </div>

         </div>
      </div>
   )
}