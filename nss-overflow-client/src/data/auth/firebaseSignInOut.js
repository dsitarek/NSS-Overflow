import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import auth from '../auth/firebaseConfig';

const signInUser = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
const signOutUser = () =>
  new Promise((resolve, reject) => {
    getAuth().signOut().then(resolve).catch(reject);
  });
export { signInUser, signOutUser };
