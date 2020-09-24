import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ChatMenu from './components/pages/ChatMenu';
import Login from './components/pages/Login';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/menu">
            <ChatMenu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
