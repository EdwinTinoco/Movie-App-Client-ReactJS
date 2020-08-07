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
            <div className="img">
               <img src={this.props.item.image_url} alt="movie-picture" />
            </div>

            <div className="title">
               <p>{this.props.item.title}</p>
            </div>

            <div className="rated">
               <p>{this.state.rated}</p>
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
