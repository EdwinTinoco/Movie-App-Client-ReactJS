import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MoviesItems extends Component {
   constructor(props) {
      super(props);

      this.state = {
         rated: this.props.item.rated
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
               <p>Release: {this.props.item.year_release}</p>
            </div>

            <div className="rated">
               <div className="star">
                  <FontAwesomeIcon icon="star" />
                  {this.state.rated}%
               </div>

               <div className="tomatoe">
                  <FontAwesomeIcon icon="apple-alt" />
                  {(100 - this.state.rated).toFixed(1)}%
               </div>
            </div>

            <div className='movie-detail-link'>
               <Link to={`/movie/${this.props.item.id}`}>
                  <p>Movie details</p>
               </Link>
            </div>
         </div>
      )
   }
}
