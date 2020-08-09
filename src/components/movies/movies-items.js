import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MoviesItems extends Component {
   constructor(props) {
      super(props);

      this.state = {
         ratedPercent: (((this.props.item.sum / this.props.item.count) / 5) * 100).toFixed(1),
         ratedRaw: (this.props.item.sum / this.props.item.count)
      }

      this.renderStarReviews = this.renderStarReviews.bind(this)
   }

   renderStarReviews() {
      let ratedFloor = Math.floor(this.state.ratedRaw.toFixed(1));
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

                  {this.state.ratedPercent}%
               </div>

               <div className="tomatoe">
                  <FontAwesomeIcon icon="apple-alt" />
                  {(100 - this.state.ratedPercent).toFixed(1)}%
               </div>
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
