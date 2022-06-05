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
    console.log(error.response.data);
  }
};

const getCreateTags = async () => {
  try {
    const res = await axios.post(
      dbURL,
      {
        query: 'query { tag{ id tagTitle } }',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const tagList = res.data.data.tag.map((tag) => {
      return { label: tag.tagTitle, value: tag.id };
    });
    return tagList;
  } catch (error) {
    console.log(error.response.data);
  }
};

export { getAllTags, getCreateTags };
