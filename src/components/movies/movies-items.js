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
            <img src={this.props.item.image_url} alt="movie-picture" />
            <p>{this.props.item.title}</p>
            <p>{this.state.rated}</p>

            <div className='movie-detail-link'>
               <Link to={`/movie/${this.props.item.id}`}>
                  <p>Movie details</p>
               </Link>
            </div>
         </div>
      )
   }
}
