import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import ReactQuill from 'react-quill';

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
