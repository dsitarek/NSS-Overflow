import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

/**
 * Sends a POST to create a PostReply to a specified post.
 * @async
 * @return {void}
 */
const createComment = async (comment) => {
  const token = sessionStorage.getItem('idToken');
  try {
    await axios.post(`${dbURL}/Thread/AddComment`, comment, {
      headers: { Authorization: 'Bearer ' + token, idToken: token },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

/**
 * Sends a POST to create a Post on the specified thread.
 * @async
 * @return {void}
 */
const createPost = async (post) => {
  const token = sessionStorage.getItem('idToken');
  try {
    await axios.post(`${dbURL}/Thread/AddPost`, post, {
      headers: { Authorization: 'Bearer ' + token, idToken: token },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export { createComment, createPost };
