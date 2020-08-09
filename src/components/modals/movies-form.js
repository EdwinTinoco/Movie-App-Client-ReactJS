import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default class MoviesForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         id: this.props.item.id,
         title: this.props.item.title,
         description: this.props.item.description,
         genre: this.props.item.genre,
         image_url: this.props.item.image_url,
         year_release: this.props.item.year_release,
         classification: this.props.item.classification,
         duration: this.props.item.duration,
         errorsMessage: {},
         message: ""
      }

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
   }

   handleModalClose() {
      this.props.handleModalClose()
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value
      });
   }

   handleSubmit(e) {
      e.preventDefault()

      console.log('validate', this.validate());
      console.log('errors', this.state.errorsMessage);


      if (this.validate()) {

         if (this.props.action === "Edit") {
            console.log('handle submit edit movie');

            axios.put(`http://localhost:8000/api/movies/${this.state.id}/`,
               {
                  title: this.state.title,
                  description: this.state.description,
                  genre: this.state.genre,
                  image_url: this.state.image_url || "https://source.unsplash.com/random",
                  year_release: this.state.year_release,
                  classification: this.state.classification,
                  duration: this.state.duration
               })
               .then(response => {

                  this.setState({
                     errorsMessage: {},
                     message: response.data
                  })
               })
               .catch(error => {
                  console.log("handleSubmit edit movie error: ", error);
               })
         } else if (this.props.action === "Insert") {
            console.log('handle submit insert movie');

            const newMovie = {
               title: this.state.title,
               description: this.state.description,
               genre: this.state.genre,
               image_url: this.state.image_url || "https://source.unsplash.com/random",
               year_release: this.state.year_release,
               classification: this.state.classification,
               duration: this.state.duration
            }

            this.props.handleSubmitInsertMovie(newMovie)

            this.setState({
               title: "",
               description: "",
               genre: "",
               image_url: "",
               year_release: "",
               classification: "",
               duration: "",
               errorsMessage: {},
               message: "Movie added successfully!"
            })

         }
      }

   }

   validate() {
      let errors = {};
      let isValid = true;

      if (!this.state.title) {
         isValid = false;
         errors["title"] = "Please enter title";
      }

      if (!this.state.description) {
         isValid = false;
         errors["description"] = "Please enter description";
      }

      if (!this.state.genre) {
         isValid = false;
         errors["genre"] = "Please enter genre";
      }
      // if (!this.state.image_url) {
      //    isValid = false;
      //    errors["image_url"] = "Please enter movie image";
      // }
      if (!this.state.year_release) {
         isValid = false;
         errors["year_release"] = "Please enter year release";
      }
      if (!this.state.classification) {
         isValid = false;
         errors["classification"] = "Please enter classification";
      }
      if (!this.state.duration) {
         isValid = false;
         errors["duration"] = "Please enter duration";
      }

      this.setState({
         errorsMessage: errors
      })

      return isValid;
   }

   render() {
      return (
         <div className="movies-form-main-wrapper">
            <div className="action">
               <p>{`${this.props.action} Movie Info`}</p>
            </div>
            <form onSubmit={this.handleSubmit} className="form">
               <div className="form-group">
                  <label htmlFor="title"><b>Title</b></label>
                  <input type='text'
                     value={this.state.title}
                     onChange={this.handleChange}
                     className='new-entry-input'
                     name="title"
                     placeholder='Title'
                  >
                  </input>
                  <div className="error-message">{this.state.errorsMessage.title}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="description"><b>Description</b></label>
                  <input type='text'
                     value={this.state.description}
                     onChange={this.handleChange}
                     className='new-entry-input'
                     name="description"
                     placeholder='Description'
                  >
                  </input>
                  <div className="error-message">{this.state.errorsMessage.description}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="genre"><b>Genre</b></label>
                  <input type='text'
                     value={this.state.genre}
                     onChange={this.handleChange}
                     className='new-entry-input'
                     name="genre"
                     placeholder='Genre'
                  >
                  </input>
                  <div className="error-message">{this.state.errorsMessage.genre}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="image_url"><b>Movie image</b></label>
                  <input type='text'
                     value={this.state.image_url}
                     onChange={this.handleChange}
                     className='new-entry-input'
                     name="image_url"
                     placeholder='Movie image'
                  >
                  </input>
                  <div className="error-message">{this.state.errorsMessage.image_url}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="year_release"><b>Year release</b></label>
                  <input type='text'
                     value={this.state.year_release}
                     onChange={this.handleChange}
                     className='new-entry-input'
                     name="year_release"
                     placeholder='Year release'
                  >
                  </input>
                  <div className="error-message">{this.state.errorsMessage.year_release}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="classification"><b>Classification</b></label>
                  <input type='text'
                     value={this.state.classification}
                     onChange={this.handleChange}
                     className='new-entry-input'
                     name="classification"
                     placeholder='Classification'
                  >
                  </input>
                  <div className="error-message">{this.state.errorsMessage.classification}</div>
               </div>

               <div className="form-group">
                  <label htmlFor="duration"><b>Duration</b></label>
                  <input type='text'
                     value={this.state.duration}
                     onChange={this.handleChange}
                     className='new-entry-input'
                     name="duration"
                     placeholder='Duration'
                  >
                  </input>
                  <div className="error-message">{this.state.errorsMessage.duration}</div>
               </div>

               <div className="buttons-form">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={this.handleModalClose}>Close</button>
               </div>
            </form>

            <p>{this.state.message}</p>
         </div>
      )
   }
}