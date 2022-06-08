import React, { useState, useEffect, useRef } from 'react';
import { getThread } from '../data/threadData';
import { useParams } from 'react-router-dom';
import { Post } from '../components/index';
import ReactTimeAgo from 'react-time-ago';
import { createComment, createPost } from '../data/postData';
import ReactQuill from 'react-quill';
import { modules } from '../quillModules';

export default function Thread() {
  const [thread, setThread] = useState({});
  const [editorPostText, seteditorPostText] = useState('');
  const threadQuill = useRef();

  let { threadId } = useParams();

  useEffect(() => {
    getThread(threadId).then(setThread);
  }, []);

  const submitComment = (commentObj) => {
    createComment(commentObj).then(() => getThread(threadId).then(setThread));
  };

  const submitPost = () => {
    const newPost = {
      PostBody: editorPostText,
      threadId: thread.id,
    };

    createPost(newPost).then(() => {
      getThread(threadId)
        .then(setThread)
        .then(() => {
          seteditorPostText('');
          threadQuill.current.editor.setText('');
        });
    });
  };

  return (
    <div className='thread-container'>
      <div className='thread-head'>
        <div className='thread-title-tags'>
          <span className='thread-title'>{thread.title}</span>
          <div className='thread-tags'>
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
        <span className='asked-span'>Asked</span>{' '}
        {thread.datePosted ? (
          <ReactTimeAgo date={new Date(thread.datePosted)} locale='en-US' />
        ) : (
          ''
        )}
      </div>
      {thread.posts
        ? thread.posts.map((post) => (
            <Post
              key={`${post.id}`}
              post={post}
              submitComment={submitComment}
            />
          ))
        : ''}
      <div className='thread-add-post-editor'>
        <span className='editor-title'>Your Answer</span>
        <div className='editor'>
          <ReactQuill
            id='threadEditor'
            theme='snow'
            modules={modules}
            onChange={seteditorPostText}
            ref={threadQuill}
          />
          <button className='submit-comment-btn blue-btn' onClick={submitPost}>
            Post Your Answer
          </button>
        </div>
      </div>
    </div>
  );
}
