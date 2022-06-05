import React, { useState, useEffect } from 'react';
import { getAllTags } from '../data/tagData';
import TagCard from '../components/TagCard';

export default function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  return (
    <div className='tag-page-container'>
      <h3>Tags</h3>
      <p>Use these tag categories to find questions matching your needs.</p>
      <div className='tag-container'>
        {tags ? tags.map((tag) => <TagCard key={tag.id} tag={tag} />) : ''}
      </div>
    </div>
  );
}
