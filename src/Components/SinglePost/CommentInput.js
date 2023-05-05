import React, { useContext } from "react";
import axios from "axios";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { ParentContext } from "../../App";
import { commentParent } from "./SinglePost";

function CommentInput({ postIdentity }) {
  // Access the navigation state from ParentContext
  const context = useContext(ParentContext);
  const [navState, handleNavState] = context.nav;

  // Access comment input state and comment reload state from commentParent
  const commentProps = useContext(commentParent);
  const [comment, handleComment] = commentProps.commentInput;
  const [commentReload, handleCommentReload] = commentProps.abc;

  // Create a tooltip to display when user is not logged in
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Please Login to comment
    </Tooltip>
  );

  // Function to post a comment to the server
  const postComment = () => {
    if (comment.length > 0) {
      // if the comment is not empty
      return axios
        .post(`/comments/${postIdentity}`, {
          // post the comment to the backend
          message: comment,
        })
        .then((res) => {
          handleComment(""); // clear the comment input field

          // trigger a state change in SinglePost component to reload the comments
          handleCommentReload(!commentReload);
        })

        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(" Enter your comment");
    }
  };

  // Render the comment input field and post button
  return (
    <div className="my-3 commentsInput ">
      <input
        type="text"
        className="p-1 py-2 ps-2  my-3 commentArea "
        value={comment}
        onChange={(e) => handleComment(e.target.value)}
        placeholder="Leave a Comment"
      />

      {/* display the post button if the user is logged in, else display the tooltip */}
      {navState ? (
        <button
          className=" mx-2  px-3 px-lg-5 btn btn-primary"
          onClick={postComment}
        >
          Post
        </button>
      ) : (
        // Otherwise, render a post button that sends the comment to the server
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className="mx-2  px-3 px-lg-5 btn btn-primary">Post</button>
        </OverlayTrigger>
      )}
    </div>
  );
}

export default CommentInput;
