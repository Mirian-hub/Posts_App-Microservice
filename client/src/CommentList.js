import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({comments}) => {
  // const [comments, setComments] = useState([]);
  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments.map((comment) => {
    let content;
    const {status} = comment
    if(status === 'approved') {
      content = comment.content;    
    }
    if(status ==='pending') {
      content = 'Comment is under moderation '
    }
    if(status === 'rejected') {
      content = 'Comment rejected'
    }
    return <li key={comment.id}>{content}</li>;
  });

  return (
    <div className="border-top">
      <h4> Comments </h4>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
