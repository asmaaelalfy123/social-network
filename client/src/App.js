import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

//components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './routing/Routes';

//redux
import { Provider } from 'react-redux';
import store from './store';

//settoken
import setAuthtoken from './utils/setAuthtoken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthtoken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
