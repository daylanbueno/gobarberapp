/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import multi from 'redux-multi';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './modules/rootReducer';

const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk, multi, promise)(createStore)(
    reducers,
    devTools
);

export default store;
