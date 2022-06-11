import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const gqlURL = databaseConfig.GraphQLURL;
const dbURL = databaseConfig.databaseURL;

/**
 * Retrieves the 10 most recent threads from the database.
 * @async GraphQL Query
 * @return {Array} Array of Thread objects.
 */
const getNewestThreads = async () => {
  try {
    const res = await axios.post(
      gqlURL,
      {
        query:
          'query { thread(order: { datePosted: DESC }, first: 10) { edges { node { id title datePosted threadTags{ tag { tagTitle } } user{ username avatar } } } } }',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.data.thread.edges.map((item) => item.node);
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Retrieves threads matching the specified tag category.
 * @async GraphQL Query
 * @return {Array} Array of Thread objects.
 */
const getTagThreads = async (tag) => {
  try {
    const res = await axios.post(
      gqlURL,
      {
        query: `query { threadsByTag(tag: "${tag}"){ tagId thread { id title datePosted threadTags{ tag { tagTitle } } user{ username avatar } } } }`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.data.threadsByTag.map((item) => item.thread);
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Retrieves threads matching the specified tag category.
 * @async GraphQL Query
 * @return {Array} Array of Thread objects.
 */
const getSearchThreads = async (search) => {
  try {
    const res = await axios.post(
      gqlURL,
      {
        query: `query { searchThread(search: "${search}"){ id title datePosted threadTags { tag { tagTitle } } user { username avatar } posts { id postBody datePosted threadId user { username avatar } postReplies { id postBody datePosted user { username avatar } } } } }`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.data.searchThread;
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Sends a POST to create a thread and initial post using values on the supplied thread object.
 * @async
 * @return {Number} ID of created thread.
 */
const createThread = async (thread) => {
  const token = sessionStorage.getItem('idToken');
  try {
    const res = await axios.post(`${dbURL}/Thread/Create`, thread, {
      headers: { Authorization: 'Bearer ' + token, idToken: token },
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Retrieves thread matching the specified ID.
 * @async GraphQL Query
 * @return {Object} Thread.
 */
const getThread = async (threadId) => {
  try {
    const res = await axios.post(
      gqlURL,
      {
        query: `query { singleThread(threadId: ${threadId}) { id title datePosted threadTags { tag { tagTitle } } user { username avatar } posts { id postBody datePosted threadId user { username avatar } postReplies { id postBody datePosted user { username avatar } } } } }`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.data.singleThread[0];
  } catch (error) {
    console.log(error.response.data);
  }
};

export {
  getNewestThreads,
  getTagThreads,
  createThread,
  getThread,
  getSearchThreads,
};
