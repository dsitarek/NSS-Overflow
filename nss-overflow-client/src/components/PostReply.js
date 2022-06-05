import React from 'react';
import ReactTimeAgo from 'react-time-ago';

export default function PostReply({ reply }) {
  return (
    <li>
      <div className='post-reply'>
        <span className='post-reply-body'>{reply.postBody}</span> -
        <span className='post-reply-user'>
          {reply.user.username}
          <span className='post-reply-date'>
            <ReactTimeAgo date={new Date(reply.datePosted)} locale='en-US' />
          </span>
        </span>
      </div>
    </li>
  );
}
