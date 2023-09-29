import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const context = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setCommentsLoading(true);

      fetch('/api/comments/' + eventId)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCommentsList(data.comments);
          setCommentsLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    context.showNotification({
      title: 'Adding comment...',
      message: 'Sending comment.',
      status: 'pending',
    });

    try {
      const response = await fetch('/api/comments/' + eventId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      
      context.showNotification({
        title: 'Success!',
        message: 'Your comment was added successfully!',
        status: 'success',
      });
    } catch(err) {
      context.showNotification({
        title: 'Error!',
        message: err.message || 'Something went wrong.',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={commentsList}/>}
      {commentsLoading && <p>Loading comments...</p>}
    </section>
  );
}

export default Comments;
