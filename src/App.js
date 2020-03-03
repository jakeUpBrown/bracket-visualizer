import React from 'react';
import BracketPage from './Bracket/BracketPage.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { store } from './ducks/configure-store';
import Toolbar from './Toolbar/Toolbar.jsx';
import IndividualStandings from './Standings/IndividualStandings';
import OverallStandings from './Standings/OverallStandings';
import './App.css';


const App = 
() => {
  return (
    <Provider store={store}>
      <BrowserRouter forceRefresh={false}>
        <div className="App">
        <Toolbar />
        <Switch>
          <div className="content-area">
            <Route exact path="/" component={BracketPage} />
            <Route exact path="/standings/overall" component={OverallStandings} />
            <Route exact path="/standings/individual" component={IndividualStandings} />
          </div>
        </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};


export default App;

