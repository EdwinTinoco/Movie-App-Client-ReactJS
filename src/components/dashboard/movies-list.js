import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalEdit from "../modals/modal-edit"

export default class MoviesList extends Component {
   constructor(props) {
      super(props);

      this.state = {
         componentModalIsOpen: false,
         action: ""
      }

      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleModalOpen = this.handleModalOpen.bind(this)
   }

   handleModalClose() {
      this.setState({
         componentModalIsOpen: false,
         action: ""
      })
   }

   handleModalOpen(option) {
      this.setState({
         componentModalIsOpen: true,
         action: option
      })
   }

   render() {
      const {
         id,
         title,
         image_url,
         year_release
      } = this.props.item


      return (
         <div className="movies-list-wrapper">
            <div className="modal">
               <ModalEdit
                  handleModalClose={this.handleModalClose}
                  modalIsOpen={this.state.componentModalIsOpen}
                  item={this.props.item}
                  action={this.state.action}
               />
            </div>

            <div className="movies-info-wrapper">
               <div className="movies-info">
                  <div className="img">
                     <img src={image_url} alt="movie-picture" />
                  </div>

                  <div className="title-year">
                     <p>{`${title}  -  ${year_release}`}</p>
                  </div>
               </div>

               <div className="icons-buttons">
                  <FontAwesomeIcon icon="edit" onClick={() => this.handleModalOpen("Edit")} />
                  |
                  <FontAwesomeIcon icon="trash" onClick={() => this.props.handleDeleteMovie(id)} />
               </div>
            </div>
         </div>
      )
   }
}