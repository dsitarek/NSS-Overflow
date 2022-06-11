import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function TagCard({ tag }) {
  const tagSearch = encodeURIComponent(tag.tagTitle);
  const navigate = useNavigate();
  return (
    <div className='tag-card-container'>
      <span
        className='tag-title-span'
        onClick={() => navigate(`/questions/tags/${tagSearch}`)}
      >
        {tag.tagTitle}
      </span>
      <p>{tag.tagDescription}</p>
    </div>
  );
}

TagCard.propTypes = {
  tag: PropTypes.shape({
    tagTitle: PropTypes.string,
    tagDescription: PropTypes.string,
  }),
};
