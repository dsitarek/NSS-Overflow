import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function TagCard({ tag }) {
  const navigate = useNavigate();
  return (
    <div className='tag-card-container'>
      <span
        className='tag-title-span'
        onClick={() => navigate(`/questions/tags/${tag.tagTitle}`)}
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
