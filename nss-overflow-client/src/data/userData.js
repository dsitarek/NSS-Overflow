import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

/**
 * Checks if user exists on login using token, and creates user if not.
 * @async GET
 * @return {void}
 */
const userExistsInDB = async () => {
  const token = sessionStorage.getItem('idToken');
  try {
    await axios.get(`${dbURL}/User/Auth`, {
      headers: { Authorization: 'Bearer ' + token, idToken: token },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export default userExistsInDB;
