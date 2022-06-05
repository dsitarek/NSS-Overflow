import React from 'react';
import { PostReply } from '../components/index';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

export default function Post({ post }) {
  return (
    <div className='post-container'>
      <ReactQuill
        className='post-body'
        theme='bubble'
        readOnly={true}
        value={post.postBody}
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
        </ul>
      </div>
    </div>
  );
}
