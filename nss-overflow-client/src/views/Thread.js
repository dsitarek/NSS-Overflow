import React, { useState, useEffect } from 'react';
import { getThread } from '../data/threadData';
import { useParams } from 'react-router-dom';
import { Post } from '../components/index';
import ReactTimeAgo from 'react-time-ago';

export default function Thread() {
  const [thread, setThread] = useState({});

  let { threadId } = useParams();

  useEffect(() => {
    getThread(threadId).then(setThread);
  }, []);

  return (
    <div className='thread-container'>
      <div className='thread-head'>
        <div className='thread-title-tags'>
          <h3>{thread.title}</h3>
          <div className='thread-tags'>
            {thread.threadTags
              ? thread.threadTags.map((index) => (
                  <span
                    key={`${thread.id}-${index.tag.tagTitle}`}
                    className='thread-tag'
                  >
                    {index.tag.tagTitle}
                  </span>
                ))
              : ''}
          </div>
        </div>
        <span className='asked-span'>Asked</span>{' '}
        {thread.datePosted ? (
          <ReactTimeAgo date={new Date(thread.datePosted)} locale='en-US' />
        ) : (
          ''
        )}
      </div>
      {thread.posts
        ? thread.posts.map((post) => <Post key={`${post.id}`} post={post} />)
        : ''}
    </div>
  );
}
