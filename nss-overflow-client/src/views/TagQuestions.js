import React, { useState, useEffect } from 'react';
import { getTagThreads } from '../data/threadData';
import { ThreadListItem } from '../components/index';
import { useParams } from 'react-router-dom';

export default function TagQuestions() {
  const [threads, setThreads] = useState([]);

  let { selectedTag } = useParams();

  useEffect(() => {
    getTagThreads(selectedTag).then(setThreads);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='home-thread-container'>
      <h3>{selectedTag} Questions</h3>
      {threads.map((thread) => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
