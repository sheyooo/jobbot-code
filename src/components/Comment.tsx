import React from "react";
import { ListGroupItem } from "reactstrap";

const styles = {
  commentText: {
    fontSize: 14,
    margin: 0
  },
  commentEmail: {
    fontSize: 14
  },
  imageContainer: {
    height: 40,
    width: 40,
    flex: '0 0 40px'
  },
  contentContainer:{
    flex: '1 0 0%'
  }
}

const Comment = ({ comment }: { comment: any }) => {
  return (
    <ListGroupItem>
      <div className="d-flex">
        <div style={styles.imageContainer}>
          <img className="h-100 w-100 rounded-circle" src={'https://placeimg.com/40/40/any?' + comment.id} alt="image"/>
        </div>
        <div className="ml-3" style={styles.contentContainer}>
          <span className="text-purple font-weight-bold" style={styles.commentEmail}>{comment.email}</span>
          <p style={styles.commentText}>{comment.body}</p>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default Comment;
