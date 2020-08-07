import React from "react";

export default function MovieComments(props) {
   const {
      id,
      comment,
      created
   } = props.item

   return (
      <div className="comments-wrapper">
         <div className="comment-info">
            <p>{created}</p>
            {/* <p>{`${Username},  ${comments_date}`}</p> */}
         </div>
         <div className="comments">
            <p>{comment}</p>
         </div>
      </div>
   );
}