import React, { useState, useEffect } from 'react';
import auth from './data/auth/firebaseConfig';
import userExistsInDB from './data/userData';
import AppNavbar from './components/AppNavbar';
import { signInUser } from './data/auth/firebaseSignInOut';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (authed) => {
      if (authed) {
        const isAdmin = await authed
          .getIdTokenResult()
          .then((idTokenResult) => idTokenResult.claims.admin);
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          username: authed.email.split('@')[0],
          isAdmin,
        };
        setUser(userObj);
        sessionStorage.setItem('idToken', authed.accessToken);
        userExistsInDB(authed.accessToken);
      } else if (user || user === null) {
        setUser(false);
        sessionStorage.removeItem('idToken');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <AppNavbar user={user} />
      <div className='main-container'>Hello World</div>
    </div>
  );
}

export default App;
