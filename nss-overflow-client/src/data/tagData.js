import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.GraphQLURL;

const getAllTags = async () => {
  try {
    const res = await axios.post(
      dbURL,
      {
        query: 'query { tag{ id tagTitle tagDescription } }',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data.data.tag;
  } catch (error) {
    console.log(error);
  }
};

export default getAllTags;
