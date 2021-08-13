import React from 'react';

// Redux 
import { Provider } from "react-redux"
import store from "./store"
import './scss/App.css'
;
import NavBar from './components/Navbar/Navbar';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <NavBar/>
      </div>
    </Provider>
  );
}

export default App;
