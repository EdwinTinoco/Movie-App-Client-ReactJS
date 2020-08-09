import React, { Component } from "react";
import ReactModal from "react-modal";

import MoviesForm from "../modals/movies-form"

ReactModal.setAppElement(".app-wrapper");

export default class Modal extends Component {
   constructor(props) {
      super(props);

      this.state = {
         movie: this.props.item
      }

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

      this.handleModalClose = this.handleModalClose.bind(this)
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
               action={this.props.action}
               item={this.props.item}
            />

         </ReactModal>
      )
   }
}