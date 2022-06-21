import React, { useState, useRef } from 'react';
import { PostReply } from '../components/index';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import PropTypes from 'prop-types';
import { modules, bubbleModule } from '../quillModules';
import grayUpvote from '../assets/grayUpArrow.png';
import grayDownvote from '../assets/grayDownArrow.png';
import orangeUpvote from '../assets/orangeUpArrow.png';
import orangeDownvote from '../assets/orangeDownArrow.png';

export default function Post({ post, submitComment, submitVote }) {
  const [commentBoxActive, setCommentBoxActive] = useState(false);
  const [editorCommentText, seteditorCommentText] = useState('');

  //ReactQuill is using a ref so that it can be accessed and the editor's text cleared after a user submission.
  const postQuill = useRef();

  const addComment = (comment) => {
    submitComment(comment);
    setCommentBoxActive(!commentBoxActive);
    seteditorCommentText('');
    postQuill.current.editor.setText('');
  };

  const addVote = (vote) => {
    const voteObj = {
      postId: post.id,
      vote,
    };

    submitVote(voteObj);
  };

  return (
    <div className='post-container'>
      <div className='post-karma-container'>
        <button className='upvote-btn' onClick={() => addVote(1)}>
          <img
            className='karma-btn-img'
            src={post.userVoted === 1 ? orangeUpvote : grayUpvote}
            alt='grayUpArrow'
          />
        </button>
        <span className='post-karma-total'>{post.postVoteTotal}</span>
        <button className='downvoteBtn' onClick={() => addVote(-1)}>
          <img
            className='karma-btn-img'
            src={post.userVoted === -1 ? orangeDownvote : grayDownvote}
            alt='grayDownArrow'
          />
        </button>
      </div>
      <ReactQuill
        className='post-body'
        theme='bubble'
        readOnly={true}
        value={post.postBody}
        modules={bubbleModule}
      />
      <div className='post-info-container'>
        <div className='post-user-info'>
          <span className='post-date-span'>
            Posted {new Date(post.datePosted).toLocaleString()}
          </span>
          <div className='user-details-container'>
            <img src={post.user.avatar} alt='user-profile-img' />
            <div className='user-details'>
              <span className='username-span'>{post.user.username}</span>
              <span className='karma-span'>
                <img src={orangeUpvote} alt='karma-img' />
                {post.user.karma}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='post-reply-container'>
        <ul className='post-reply-list'>
          {post.postReplies
            ? post.postReplies.map((reply) => (
                <PostReply key={`${post.id}-${reply.id}`} reply={reply} />
              ))
            : ''}
          <li>
            {sessionStorage.getItem('user?') ? (
              <button
                className={`open-comment-btn ${
                  commentBoxActive ? 'inactive' : ''
                }`}
                onClick={() => setCommentBoxActive(!commentBoxActive)}
              >
                Add a comment
              </button>
            ) : (
              ''
            )}
            <div
              className={`comment-quill ${commentBoxActive ? '' : 'inactive'}`}
            >
              <ReactQuill
                theme='snow'
                modules={modules}
                onChange={seteditorCommentText}
                ref={postQuill}
              />
              <button
                className='submit-comment-btn blue-btn'
                onClick={() =>
                  addComment({
                    PostBody: editorCommentText,
                    PostReplyId: post.id,
                  })
                }
              >
                Submit Comment
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    datePosted: PropTypes.string,
    idToken: PropTypes.number,
    postBody: PropTypes.string,
    threadId: PropTypes.number,
    postVoteTotal: PropTypes.number,
    postReplies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        postBody: PropTypes.string,
        datePosted: PropTypes.string,
        user: PropTypes.shape({
          username: PropTypes.string,
          avatar: PropTypes.string,
        }),
      })
    ),
  }),
  submitComment: PropTypes.func,
};
