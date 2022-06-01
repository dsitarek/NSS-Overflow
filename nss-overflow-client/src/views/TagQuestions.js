import React, { useState, useEffect } from 'react';
import getNewestThreads from '../data/threadData';
import { ThreadListItem } from '../components/index';

export default function TagQuestions() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getNewestThreads().then(setThreads);
  }, []);

  return (
    <div className='home-thread-container'>
      {threads.map((thread) => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
