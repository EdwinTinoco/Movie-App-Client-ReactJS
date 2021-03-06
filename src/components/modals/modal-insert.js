import React, { Component } from "react";
import ReactModal from "react-modal";

import MoviesForm from "./movies-form"

ReactModal.setAppElement(".app-wrapper");

export default class ModalInsert extends Component {
   constructor(props) {
      super(props);

      this.customStyles = {
         content: {
            top: "50%",
            left: "50%",
            rigth: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "590px",
            height: "580px"
         },
         overlay: {
            backgroundColor: "rgba(1, 1, 1, 0.75)"
         }
      }

      this.item = {
         id: 0,
         title: "",
         description: "",
         genre: "",
         image_url: "",
         year_release: "",
         classification: "",
         duration: ""
      }

      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleSubmitInsertMovie = this.handleSubmitInsertMovie.bind(this)
   }

   handleSubmitInsertMovie(newMovie) {
      this.props.handleSubmitInsertMovie(newMovie)
   }

   handleModalClose() {
      this.props.handleModalClose()
   }

   render() {
      return (
         <ReactModal
            style={this.customStyles}
            onRequestClose={() => {
               this.props.handleModalClose();
            }}
            isOpen={this.props.modalIsOpen}
         >

            <MoviesForm
               handleModalClose={this.handleModalClose}
               handleSubmitInsertMovie={this.handleSubmitInsertMovie}
               action={this.props.action}
               item={this.item}
            />

         </ReactModal>
      )
   }
}