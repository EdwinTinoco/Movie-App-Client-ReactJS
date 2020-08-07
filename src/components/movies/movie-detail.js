import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MovieComments from './movie-comments'

export default function MovieDetails(props) {
   const [movieId, setMovieId] = useState(props.match.params.slug)
   const [movie, setMovie] = useState({})
   const [movieComments, setMovieComments] = useState([])
   const [inputComment, setInputComment] = useState("")
   const [totalUsersRated, setTotalUsersRated] = useState(0)
   const [sumUsersRates, setSumUsersRates] = useState(0)
   const [rating, setRating] = useState(0)
   const [userRateOption, setUserRateOption] = useState(0)

   const handleStars = (val) => {
      // if (val === -1) {
      //    setUserRateOption(val)
      // }
      if (val === 0) {
         console.log('val', val);

         setUserRateOption(val)
      }
      if (val === 1) {
         console.log('val', val);
         setUserRateOption(val)
      }
      if (val === 2) {
         console.log('val', val);
         setUserRateOption(val)
      }
      if (val === 3) {
         console.log('val', val);
         setUserRateOption(val)
      }
      if (val === 4) {
         console.log('val', val);
         setUserRateOption(val)
      }
      if (val === 5) {
         console.log('val', val);
         setUserRateOption(val)
      }
   }

   const handleSubmitRate = (e) => {
      e.preventDefault();

      if (userRateOption !== 0) {
         let totalUsers = totalUsersRated + 1
         let sumRates = sumUsersRates + userRateOption

         setTotalUsersRated(
            totalUsers
         )

         setSumUsersRates(
            sumRates
         )

         setRating(
            (((sumRates / totalUsers) / 5) * 100).toFixed(1)
         )

         if (userRateOption !== 0) {
            axios.post('http://localhost:8000/api/movies/rates/',
               {
                  rated: userRateOption,
                  movie_id: movieId,
                  user_id: 1
               }
            )
               .then(response => {
                  setUserRateOption(0)
               })
               .catch(err => console.log("handleSubmitRate Error: ", err))
         }
      }
   }

   const handleSubmitComment = (e) => {
      e.preventDefault();

      let dateTimeToday = new Date()
      let month = dateTimeToday.getMonth()
      let day = dateTimeToday.getDate()
      let year = dateTimeToday.getFullYear()
      let hours = dateTimeToday.getHours()
      let min = dateTimeToday.getMinutes()
      let sec = dateTimeToday.getSeconds()
      let todayTime = `${month + 1}/${day}/${year}  ${hours}:${min}:${sec}`

      if (inputComment !== "") {
         axios
            .post("http://localhost:8000/api/movies/comments/", {
               comment: inputComment,
               created: todayTime,
               movie_id: parseInt(movieId),
               user_id: 1
            })
            .then(response => {

               console.log('res add comments', response.data);
               setInputComment('')

               getMovieComments()
            })
            .catch(err => console.log("handleSubmitComment Error: ", err))
      }
   }

   const getMovieItem = () => {
      axios.get(`http://localhost:8000/api/movies/${movieId}/`)
         .then(response => {
            console.log('movie item', response.data)

            setMovie(
               response.data[0]
            )

         }).catch(error => {
            console.log('getMovieItem error', error);
         })
   }

   const getTotalIUsersRateMovie = () => {
      axios.get(`http://localhost:8000/api/movies/rates/${movieId}`)
         .then(response => {
            console.log('total users rated', response.data)

            if (response.data[0][0] !== 0) {
               setTotalUsersRated(
                  response.data[0][0]
               )

               setSumUsersRates(
                  response.data[0][1]
               )

               setRating(
                  (((response.data[0][1] / response.data[0][0]) / 5) * 100).toFixed(1)
               )
            }


         }).catch(error => {
            console.log('getMovieItem error', error);
         })
   }

   const getMovieComments = () => {

      axios.get(`http://localhost:8000/api/movies/comments/${movieId}/`)
         .then(response => {
            console.log('movie comments', response.data)

            setMovieComments(
               response.data
            )

         }).catch(error => {
            console.log('getMovieComments error', error);
         })
   }

   const commentsByMovie = () => {
      return movieComments.map(item => {
         return <MovieComments key={item.id} item={item} />
      })
   }

   const setStyle = () => {
      // if (currentUser.users_role === "admin") {
      //    return { display: "block" }
      // } else if (currentUser.users_role === "user") {
      //    return { display: "block" }
      // } else {
      //    return { display: "none" }
      // }
   }

   useEffect(() => {
      getMovieItem();
      getTotalIUsersRateMovie();
      getMovieComments();
   }, [])

   const {
      id,
      title,
      description,
      genre,
      image_url,
      year_release,
      classification,
      duration
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

               <div className="rated">
                  <p>Ratings:</p>
                  <div className="ratings">
                     <div className="star">
                        <FontAwesomeIcon icon="star" />
                        {rating}%
                     </div>

                     <div className="tomatoe">
                        <FontAwesomeIcon icon="apple-alt" />
                        {(100 - rating).toFixed(1)}%
                     </div>

                     <div className="users-rated">
                        <p>total users rated: {totalUsersRated}</p>
                     </div>
                  </div>

               </div>

               <div className="year">
                  <p>Year release: {year_release}</p>
               </div>

               <div className="calssif">
                  <p>Classification: {classification}</p>
               </div>

               <div className="duration">
                  <p>Duration: {duration}</p>
               </div>

               <div className="genre">
                  <p>Genre: {genre}</p>
               </div>

               <div className="descr">
                  <p className="title">Description:</p>
                  <p>{description}</p>
               </div>

               <div className="rate-movie-wrapper">
                  <p>Rate the movie</p>

                  <div className="stars">
                     <div className="icon">
                        <FontAwesomeIcon icon="star" onClick={() => handleStars(1)} />
                     </div>
                     <div className="icon">
                        <FontAwesomeIcon icon="star" onClick={() => handleStars(2)} />
                     </div>
                     <div className="icon">
                        <FontAwesomeIcon icon="star" onClick={() => handleStars(3)} />
                     </div>
                     <div className="icon">
                        <FontAwesomeIcon icon="star" onClick={() => handleStars(4)} />
                     </div>
                     <div className="icon">
                        <FontAwesomeIcon icon="star" onClick={() => handleStars(5)} />
                     </div>

                     <div className="button-rate">
                        <button type="button" onClick={handleSubmitRate}>Submit rate</button>
                     </div>

                  </div>
               </div>
            </div>
         </div>

         <div className="comments-main-wrapper">
            <div className="add-comments">
               <form onSubmit={handleSubmitComment} className="comments-form" style={setStyle()}>
                  <h3>Add a comment</h3>
                  <textarea
                     type="text"
                     placeholder="Comments"
                     name="comment"
                     onChange={({ target }) => { setInputComment(target.value) }}
                     value={inputComment}
                  />

                  <div className="btn-comment">
                     <button type="submit">Add</button>
                  </div>
               </form>
            </div>

            <div className="show-comments">
               <p>Comments</p>
               {commentsByMovie()}
            </div>
         </div>
      </div>
   )
}