import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './scss/App.css';
import NavBar from './components/Navbar/Navbar';
import Registration from './components/Navbar/Registration';
import Login from './components/Login/Login';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/Alerts/Alert';
import Information from './components/information/Information';
import Buildhome from './components/Buildform/Buildhome';
import Logout from './components/Navbar/Logout';

const App = () => {
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [user, setUser] = useState('none');

  useEffect(() => {
    checkForUser();
    console.log(user);
  }, [user]);

  const getUser = () => {
    let cookieCrumble = document.cookie.split('=');
    console.log(cookieCrumble);
    const user = cookieCrumble[1];
    setUser(user);
  };

  const checkForUser = () => {
    if (user === 'none') {
      getUser();
    }
  };
  return (
    <Provider store={store}>
      <div className='App'>
        <NavBar user={user} />
        <Alert />
        {window.location.pathname === '/' && (
          <div>
            <div className='main-body'>
              <h1 className='welcome-title'>Welcome to customKeys</h1>
              <h3 className='welcome-description'>
                Find and make your perfect custom mechanical keyboard.
              </h3>
              <div className='btn-holder'>
                <div className='info-card'>
                  <h4>Need To Learn More</h4>
                  <p>
                    Click on the button below to learn more about what makes up
                    a custom keyboard
                  </p>
                  <button
                    className='info-btn'
                    onClick={() => setInfoSwitch(!infoSwitch)}>
                    Info
                  </button>
                </div>

                <div className='info-card'>
                  <h4>Ready to Build</h4>
                  <p>
                    Know what you want? Click here to start building your custom
                    keyboard.
                  </p>
                  <button
                    className='build-btn'
                    onClick={() => (window.location.href = '/build')}>
                    Build It
                  </button>
                </div>
                <div className='info-card'>
                  <h4>Need Help</h4>
                  <p>
                    Want to see some recomendations? Click below to see a
                    recomendation based on your preferances.
                  </p>
                  <button
                    className='rec-btn'
                    onClick={() => (window.location.href = '/buildhelper')}>
                    Recomendations
                  </button>
                </div>
              </div>
            </div>
            <div className='info-section'>
              {infoSwitch ? <Information /> : null}
            </div>
          </div>
        )}
        <Switch>
          <Route path='/register' component={Registration} />
          <Route
            path='/login/'
            render={(props) => <Login {...props} getUser={getUser} />}
          />
          <Route
            path='/build'
            render={(props) => <Buildhome {...props} user={user} />}
          />
          <Route
            path='/logout'
            render={(props) => (
              <Logout {...props} user={user} getUser={getUser} />
            )}
          />
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
