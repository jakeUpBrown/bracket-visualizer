import { createStore } from 'redux';
import { countReducer } from './reducer';

export const store = createStore(countReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);