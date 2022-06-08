import React, { useState, useEffect } from 'react';
import { getNewestThreads } from '../data/threadData';
import { ThreadListItem } from '../components/index';

export default function Home() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getNewestThreads().then(setThreads);
  }, []);

  return (
    <div className='home-thread-container'>
      <span className='home-title-span'>Newest Questions</span>
      {threads.map((thread) => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
