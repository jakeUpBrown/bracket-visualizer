import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import Toolbar from './Toolbar/Toolbar.jsx';
import ContentArea from './ContentArea';

import './App.css';


const App = 
({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter forceRefresh={true}>
        <div className="App">
        <Toolbar />
        <Route path="/" component={ContentArea} />
        </div>
      </BrowserRouter>
    </Provider>
  );
};


export default App;

