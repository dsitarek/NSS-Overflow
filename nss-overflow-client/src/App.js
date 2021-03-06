import React, { useState, useEffect } from 'react';
import Routes from './routes/index';
import auth from './data/auth/firebaseConfig';
import userExistsInDB from './data/userData';
import { AppNavbar, SideNav } from './components/index';
import { useNavigate } from 'react-router-dom';
import footerLogo from './assets/NSSOverflowWhite2.png';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (authed) => {
      if (authed) {
        const userObj = {
          profilePic: authed.photoURL,
          username: authed.email.split('@')[0],
        };
        setUser(userObj);
        sessionStorage.setItem('idToken', authed.accessToken);
        sessionStorage.setItem('user?', true);
        userExistsInDB(authed.accessToken);
      } else if (authed === null) {
        setUser(false);
        sessionStorage.removeItem('idToken');
        sessionStorage.removeItem('user?');
      }
    });
  }, []);

  return (
    <div className='page-container'>
      <AppNavbar user={user} />
      <div className='app-container'>
        <SideNav />
        <div className='main-container'>
          <Routes />
        </div>
        <button
          className='post-question-btn blue-btn'
          onClick={() => navigate('/askQuestion')}
        >
          Ask Question
        </button>
      </div>
      <footer className='footer'>
        <img className='footer-logo' src={footerLogo} alt='footerLogo' />
      </footer>
    </div>
  );
}

export default App;
