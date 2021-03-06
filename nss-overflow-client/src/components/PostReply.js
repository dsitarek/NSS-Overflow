import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import { modules } from '../quillModules';

export default function PostReply({ reply }) {
  return (
    <li>
      <div className='post-reply'>
        <div className='post-reply-body'>
          {' '}
          <ReactQuill
            className='post-body'
            theme='bubble'
            readOnly={true}
            value={reply.postBody}
            modules={modules}
          />
        </div>{' '}
        <div className='post-reply-user'>
          -{reply.user.username}
          <span className='post-reply-date'>
            <ReactTimeAgo date={new Date(reply.datePosted)} locale='en-US' />
          </span>
        </div>
      </div>
    </li>
  );
}

PostReply.propTypes = {
  reply: PropTypes.shape({
    datePosted: PropTypes.string,
    id: PropTypes.number,
    postBody: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }),
};
