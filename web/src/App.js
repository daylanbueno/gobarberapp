import React from 'react';
import { Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';
import './config/ReactotronConfig';
import store from './store';
import Routes from './routes';
import history from './services/history';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Routes />
                <GlobalStyle />3
                <ToastContainer autoClose={3000} />
            </Router>
        </Provider>
    );
}

export default App;
