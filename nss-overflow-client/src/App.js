import React, { useState, useEffect } from 'react';
import Routes from './routes/index';
import auth from './data/auth/firebaseConfig';
import userExistsInDB from './data/userData';
import { AppNavbar, SideNav } from './components/index';
import getNewestThreads from './data/threadData';

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
        getNewestThreads();
      } else if (user || user === null) {
        setUser(false);
        sessionStorage.removeItem('idToken');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AppNavbar user={user} />
      <div className='app-container'>
        <SideNav />
        <div className='main-container'>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default App;
