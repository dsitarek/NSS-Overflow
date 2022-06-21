import React, { useState, useEffect, useRef } from 'react';
import { getThread } from '../data/threadData';
import { useParams } from 'react-router-dom';
import { Post } from '../components/index';
import ReactTimeAgo from 'react-time-ago';
import { createComment, createPost, votePost } from '../data/postData';
import ReactQuill from 'react-quill';
import { modules } from '../quillModules';
import { signInUser } from '../data/auth/firebaseSignInOut';
import signInButton from '../assets/googleSignIn.png';

export default function Thread() {
  const [thread, setThread] = useState({});
  const [editorPostText, seteditorPostText] = useState('');

  //ReactQuill is using a ref so that it can be accessed and the editor's text cleared after a user submission.
  const threadQuill = useRef();

  let { threadId } = useParams();

  useEffect(() => {
    getThread(threadId).then((threadObj) => {
      if (threadObj !== null) setThread(threadObj);
      else
        return (
          <span className='thread-not-exist-span'>Thread does not exist!</span>
        );
    });
  }, [threadId]);

  const submitComment = (commentObj) => {
    createComment(commentObj).then(() => getThread(threadId).then(setThread));
  };

  const submitVote = (voteObj) => {
    votePost(voteObj).then(() => getThread(threadId).then(setThread));
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
              submitVote={submitVote}
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
          {sessionStorage.getItem('user?') ? (
            <button
              className='submit-comment-btn blue-btn'
              onClick={submitPost}
            >
              Post Your Answer
            </button>
          ) : (
            <>
              Sign in to post your answer.{' '}
              <button
                type='button'
                className='login-btn-container'
                onClick={signInUser}
              >
                <img className='login-btn' src={signInButton} alt='sign in' />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
