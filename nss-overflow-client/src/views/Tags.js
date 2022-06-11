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
      <div className='tag-header'>
        <span className='tag-title-span'>Tags</span>
        <p>Use these tag categories to find questions matching your needs.</p>
      </div>
      <div className='tag-container'>
        {tags ? tags.map((tag) => <TagCard key={tag.id} tag={tag} />) : ''}
      </div>
    </div>
  );
}
