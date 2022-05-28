import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

const userExistsInDB = async () => {
  const token = sessionStorage.getItem('idToken');
  try {
    await axios.get(`${dbURL}/User/Auth`, {
      headers: { Authorization: 'Bearer ' + token, idToken: token },
    });
  } catch (error) {
    console.log(error);
  }
};

export default userExistsInDB;
