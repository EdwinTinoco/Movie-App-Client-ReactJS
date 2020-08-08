import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MoviesItems extends Component {
   constructor(props) {
      super(props);

      this.state = {
         ratedPercent: (((this.props.item.sum / this.props.item.count) / 5) * 100).toFixed(1)
      }

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
               <div className="star">
                  <FontAwesomeIcon icon="star" />
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
