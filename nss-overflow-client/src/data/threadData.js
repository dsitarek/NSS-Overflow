import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.GraphQLURL;

/**
 * Retrieves the 10 most recent threads from the database.
 * @async GraphQL Query
 * @return {Array} Array of Thread objects.
 */
const getNewestThreads = async () => {
  try {
    const res = await axios.post(
      dbURL,
      {
        query:
          'query { thread(order: { datePosted: DESC }, first: 10) { edges { node { id title datePosted user{ username avatar } } } } }',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.data.thread.edges.map((item) => item.node);
  } catch (error) {
    console.log(error);
  }
};

export default getNewestThreads;
