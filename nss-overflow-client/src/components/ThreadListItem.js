import React from 'react';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago';
import { NavLink } from 'react-router-dom';

export default function ThreadListItem({ thread }) {
  return (
    <div className='thread-list-item'>
      <div className='thread-list-item-karma-container'>
        <ul>
          <li>votes</li>
          <li>answers</li>
        </ul>
      </div>
      <div className='thread-list-item-body'>
        <NavLink to={`/${thread.id}`}>{thread.title}</NavLink>
      </div>
      <span className='thread-posted-by-span'>
        Posted by: <img src={thread.user.avatar} alt='user-profile-img' />
        {thread.user.username}{' '}
        <ReactTimeAgo date={new Date(thread.datePosted)} locale='en-US' />
      </span>
    </div>
  );
}

ThreadListItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    datePosted: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }),
};
