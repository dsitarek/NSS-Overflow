import React, { useState, useEffect } from 'react';
import { getSearchThreads } from '../data/threadData';
import { ThreadListItem } from '../components/index';
import { useParams } from 'react-router-dom';

export default function Search() {
  const [threads, setThreads] = useState([]);

  let { search } = useParams();

  useEffect(() => {
    getSearchThreads(search).then(setThreads);
  }, [search]);

  return (
    <div className='home-thread-container'>
      <h3>Search Results for: "{search}"</h3>
      {threads.map((thread) => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
