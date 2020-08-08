import React from "react";

export default function MovieComments(props) {
   const {
      id,
      comment,
      name,
      created
   } = props.item

   return (
      <div className="comments-wrapper">
         <div className="comment-info">
            <div className="info">
               {name}
            </div>

            <div className="info">
               {created}
            </div>
         </div>
         <div className="comments">
            <p>{comment}</p>
         </div>
      </div>
   );
}