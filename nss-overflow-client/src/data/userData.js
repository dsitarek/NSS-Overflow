import axios from 'axios';
import databaseConfig from './auth/apiKeys';

const dbURL = databaseConfig.databaseURL;

const userExistsInDB = async () => {
  await axios.get(`${dbURL}/User`);
  // const token = sessionStorage.getItem('idToken');
  // try {
  //   console.log(dbURL);
  //   await axios.get(`${dbURL}/User`, {
  //     headers: { Authorization: 'Bearer ' + token, idToken: token },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export default userExistsInDB;
