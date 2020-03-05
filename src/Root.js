import React from 'react';
import BracketPage from './Bracket/BracketPage.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Toolbar from './Toolbar/Toolbar.jsx';
import IndividualStandings from './Standings/IndividualStandings';
import OverallStandings from './Standings/OverallStandings';
import ContentArea from './ContentArea';

import './App.css';


const App = 
({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter forceRefresh={false}>
        <div className="App">
        <Toolbar />
        <Route path="/" component={ContentArea} />
        </div>
      </BrowserRouter>
    </Provider>
  );
};


export default App;

