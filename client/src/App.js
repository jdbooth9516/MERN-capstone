import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import './scss/App.css';
import NavBar from './components/Navbar/Navbar';
import Registration from './components/Navbar/Registration';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <NavBar />
        <Switch>
          <Route path='/register' component={Registration} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
