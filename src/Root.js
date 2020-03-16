import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import Toolbar from './components/Toolbar/Toolbar';
import ContentArea from './ContentArea';

import './App.css';


const App = 
({ store }) => {
  return (
    <div className="background">
      <Provider store={store}>
        <BrowserRouter forceRefresh={false}>
          <div className="App">
          <Toolbar />
          <Route path="/" component={ContentArea} />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};


export default App;

