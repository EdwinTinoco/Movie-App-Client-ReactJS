import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MovieComments from './movie-comments'

export default function MovieDetails(props) {
   const [user, setUser] = useState({})
   const [movieId, setMovieId] = useState(props.match.params.slug)
   const [movie, setMovie] = useState({})
   const [movieComments, setMovieComments] = useState([])
   const [inputComment, setInputComment] = useState("")
   const [totalUsersRated, setTotalUsersRated] = useState(0)
   const [sumUsersRates, setSumUsersRates] = useState(0)
   const [rating, setRating] = useState(0)
   const [userRateOption, setUserRateOption] = useState(0)
   const [toggleStar1, setToggleStar1] = useState(false)
   const [colorStar1, setColorStar1] = useState("#545454")
   const [colorStar2, setColorStar2] = useState("#545454")
   const [colorStar3, setColorStar3] = useState("#545454")
   const [colorStar4, setColorStar4] = useState("#545454")
   const [colorStar5, setColorStar5] = useState("#545454")

   const handleStars = (val) => {
      if (val === 0) {
         console.log('val', val);

         setUserRateOption(val)
      }
      if (val === 1) {
         console.log('val', val);
         console.log('toggle', toggleStar1);

         if (toggleStar1 === false) {
            console.log('false');

            setColorStar1("#FFBE0B")
            setUserRateOption(val)
            setToggleStar1(true)

            setColorStar2('#545454')
            setColorStar3('#545454')
            setColorStar4('#545454')
            setColorStar5('#545454')

         } else {
            console.log('true');

            setColorStar1("#545454")
            setUserRateOption(0)
            setToggleStar1(false)
         }
      }
      if (val === 2) {
         console.log('val', val);

         setColorStar2("#FFBE0B")
         setUserRateOption(val)

         setColorStar1('#FFBE0B')
         setToggleStar1(false)

         setColorStar3('#545454')
         setColorStar4('#545454')
         setColorStar5('#545454')
      }
      if (val === 3) {
         console.log('val', val);

         setColorStar3("#FFBE0B")
         setUserRateOption(val)

         setColorStar1('#FFBE0B')
         setToggleStar1(false)
         setColorStar2('#FFBE0B')

         setColorStar4('#545454')
         setColorStar5('#545454')
      }
      if (val === 4) {
         console.log('val', val);

         setColorStar4("#FFBE0B")
         setUserRateOption(val)

         setColorStar1('#FFBE0B')
         setToggleStar1(false)
         setColorStar2('#FFBE0B')
         setColorStar3('#FFBE0B')

         setColorStar5('#545454')
      }
      if (val === 5) {
         console.log('val', val);

         setColorStar5("#FFBE0B")
         setUserRateOption(val)

         setColorStar1('#FFBE0B')
         setToggleStar1(false)
         setColorStar2('#FFBE0B')
         setColorStar3('#FFBE0B')
         setColorStar4('#FFBE0B')
      }
   }

   const handleSubmitRate = (e) => {
      e.preventDefault();

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

      axios.post('http://localhost:8000/api/movies/rates/',
         {
            rated: userRateOption,
            movie_id: movieId,
            user_id: parseInt(user.id)
         }
      )
         .then(response => {
            setColorStar1("#545454")
            setColorStar2("#545454")
            setColorStar3("#545454")
            setColorStar4("#545454")
            setColorStar5("#545454")
            setToggleStar1(false)
            setUserRateOption(0)
         })
         .catch(err => console.log("handleSubmitRate Error: ", err))
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
               user_id: parseInt(user.id)
            })
            .then(response => {
               setInputComment('')

               getMovieComments()
            })
            .catch(err => console.log("handleSubmitComment Error: ", err))
      }
   }

   const handleLogout = () => {
      console.log('logout');

      setUser({})
      Cookies.remove("_sb%_user%_session")
      window.location.reload(false);
   }

   const getUser = () => {
      let userCookie = Cookies.get("_sb%_user%_session")
      let temp = 0
      let userIdArr = []

      if (userCookie !== undefined) {
         for (var i = 0; i < userCookie.length; i++) {
            if (userCookie[i] == "%") {
               temp += 1
            }

            if (temp === 2) {
               if (userCookie[i] !== "%") {
                  userIdArr.push(userCookie[i])
               }
            }
         }

         let userId = userIdArr.join('')

         axios.get(`http://localhost:8000/api/users/${userId}/`)
            .then(response => {

               if (response.data.length > 0) {
                  setUser(
                     response.data[0]
                  )
               } else {
                  handleLogout()
               }

            }).catch(error => {
               setError(
                  "An error ocurred"
               )
            });
      }
   }

   const getMovieItem = () => {
      axios.get(`http://localhost:8000/api/movies/${movieId}/`)
         .then(response => {

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

   const renderStarReviews = () => {
      let ratedFloor = Math.floor(movie.sum / movie.count).toFixed(1);
      let arrRatedFloor = []

      for (var i = 1; i < ratedFloor + 1; i++) {
         arrRatedFloor.push(i)
      }

      return arrRatedFloor.map(item => {
         return (
            <MovieStarReviews key={item} />
         )
      })
   }

   useEffect(() => {
      getMovieItem();
      getTotalIUsersRateMovie();
      getMovieComments();
      getUser()
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
                  <div className="star-wrapper">
                     {renderStarReviews()}

                     {rating}%
                  </div>

                  <div className="tomatoe">
                     <FontAwesomeIcon icon="apple-alt" />
                     {(100 - rating).toFixed(1)}%
                  </div>

                  <div className="users-rated">
                     <p>Total users rated: {totalUsersRated}</p>
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

               {Object.entries(user).length > 0 ? (
                  <div className="review-movie-wrapper">
                     <p>Give a review to the movie</p>

                     <div className="stars">
                        <div className="icon">
                           <FontAwesomeIcon icon="star" style={{ color: `${colorStar1}` }} onClick={() => handleStars(1)} />
                        </div>
                        <div className="icon">
                           <FontAwesomeIcon icon="star" style={{ color: `${colorStar2}` }} onClick={() => handleStars(2)} />
                        </div>
                        <div className="icon">
                           <FontAwesomeIcon icon="star" style={{ color: `${colorStar3}` }} onClick={() => handleStars(3)} />
                        </div>
                        <div className="icon">
                           <FontAwesomeIcon icon="star" style={{ color: `${colorStar4}` }} onClick={() => handleStars(4)} />
                        </div>
                        <div className="icon">
                           <FontAwesomeIcon icon="star" style={{ color: `${colorStar5}` }} onClick={() => handleStars(5)} />
                        </div>

                        <div className="button-rate">
                           <button type="button" onClick={handleSubmitRate}>Submit rate</button>
                        </div>
                     </div>
                  </div>
               )
                  :
                  null
               }
            </div>
         </div>

         <div className="comments-main-wrapper">

            {Object.entries(user).length > 0 ? (
               <div className="add-comments">
                  <form onSubmit={handleSubmitComment} className="comments-form">
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
            )
               :
               null
            }

            <div className="show-comments">
               <p>Comments</p>
               {commentsByMovie()}
            </div>
         </div>
      </div>
   )
}

function MovieStarReviews() {
   return (
      <div className="stars">
         <FontAwesomeIcon icon="star" />
      </div>
   )

}