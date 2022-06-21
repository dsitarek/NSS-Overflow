import React from 'react';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago';
import { NavLink } from 'react-router-dom';

export default function ThreadListItem({ thread }) {
  return (
    <div className='thread-list-item'>
      <div className='thread-list-item-karma-container'>
        <ul>
          <li>{thread.threadKarma} votes</li>
          <li>{thread.answerCount} answers</li>
        </ul>
      </div>
      <div className='thread-list-item-body'>
        <NavLink to={`/questions/${thread.id}`}>{thread.title}</NavLink>
        <div>
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
      <span className='thread-posted-by-span'>
        <img src={thread.user.avatar} alt='user-profile-img' />
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
    answerCount: PropTypes.number,
    threadKarma: PropTypes.number,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        postVoteTotal: PropTypes.number,
        postKarmaList: PropTypes.arrayOf(
          PropTypes.shape({
            vote: PropTypes.number,
          })
        ),
      })
    ),
    threadTags: PropTypes.arrayOf(
      PropTypes.shape({
        tag: PropTypes.shape({
          tagTitle: PropTypes.string,
        }),
      })
    ),
    user: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }),
};
