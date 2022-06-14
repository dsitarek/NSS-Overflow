import React, { useState, useRef } from 'react';
import { PostReply } from '../components/index';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import PropTypes from 'prop-types';
import { modules, bubbleModule } from '../quillModules';

export default function Post({ post, submitComment }) {
  const [commentBoxActive, setCommentBoxActive] = useState(false);
  const [editorCommentText, seteditorCommentText] = useState('');
  const postQuill = useRef();

  const addComment = (comment) => {
    submitComment(comment);
    setCommentBoxActive(!commentBoxActive);
    seteditorCommentText('');
    postQuill.current.editor.setText('');
  };

  return (
    <div className='post-container'>
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
          <div>
            <img src={post.user.avatar} alt='user-profile-img' />
            <span className='username-span'>{post.user.username}</span>
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
