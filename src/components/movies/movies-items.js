import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MoviesItems extends Component {
   constructor(props) {
      super(props);

      this.state = {
         totalUsersRated: this.props.item.count - 1,
         sumUsersRates: this.props.item.sum,
         ratings: 0.0,
         tomatoes: 0.0,
         ratingsRaw: 0.0
      }

      this.renderStarReviews = this.renderStarReviews.bind(this)
      this.calculateRatingsTomatoes = this.calculateRatingsTomatoes.bind(this)
   }

   calculateRatingsTomatoes() {
      if (this.state.totalUsersRated > 0) {
         this.setState({
            ratings: (((this.state.sumUsersRates / this.state.totalUsersRated) / 5) * 100).toFixed(1),
            tomatoes: (100.0 - (((this.state.sumUsersRates / this.state.totalUsersRated) / 5) * 100)).toFixed(1),
            ratingsRaw: (this.state.sumUsersRates / this.state.totalUsersRated).toFixed(1)
         })

      } else {
         this.setState({
            ratings: 0.0,
            tomatoes: 0.0,
            ratingsRaw: 0.0
         })
      }
   }

   renderStarReviews() {
      if ((this.props.item.count - 1) > 1) {
         let ratedFloor = Math.floor(Math.round(this.state.ratingsRaw));

         if (ratedFloor > 0) {
            let arrRatedFloor = []
            for (var i = 1; i < ratedFloor + 1; i++) {
               arrRatedFloor.push(i)
            }

            return arrRatedFloor.map(item => {
               return (
                  <MovieStarReviews key={item} />
               )
            })
         } else {
            return (
               <FontAwesomeIcon icon="star" style={{ color: '#545454' }} />
            )
         }

      } else {
         return (
            <FontAwesomeIcon icon="star" style={{ color: '#545454' }} />
         )
      }
   }

   componentDidMount() {
      this.calculateRatingsTomatoes()
   }

   render() {

      return (
         <div className="movies-wrapper">
            <div className="title">
               <p>{this.props.item.title}</p>
            </div>

            <div className="img">
               <img src={this.props.item.image_url} alt="movie-picture" />
            </div>

            <div className="year">
               Release: {this.props.item.year_release}
            </div>

            <div className="rated">
               <div className="star-wrapper">
                  {this.renderStarReviews()}

                  {this.state.ratings}%
               </div>

               <div className="tomatoe">
                  <FontAwesomeIcon icon="apple-alt" />
                  {this.state.tomatoes}%
               </div>

            </div>

            <div className="count-users">
               Rates: {this.state.totalUsersRated}
            </div>

            <div className='movie-detail-link'>
               <Link to={`/movie/${this.props.item.id}`}>
                  + Movie details
               </Link>
            </div>
         </div>
      )
   }
}

class MovieStarReviews extends Component {
   render() {
      return (
         <div className="stars">
            <FontAwesomeIcon icon="star" />
         </div>
      )
   }
}
